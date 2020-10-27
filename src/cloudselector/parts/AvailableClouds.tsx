import React, { useEffect, useState } from "react";
import { isEmpty, sortBy } from "lodash";
import styled from "styled-components";
import { api_post } from "~/src/utils/api.ts";

const PROXY_URL = "http://localhost/sort_clouds_by_distance";

export function AvailableClouds(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortByLocation, setSortByLocation] = useState(false);
  const [dataCenterTable, setDataCenterTable] = useState([]);
  const [myLatitude, setMyLatitude] = useState(null);
  const [myLongitude, setMyLongitude] = useState(null);

  function successLocation(position) {
    setLoading(true);
    setErrorMessage("");
    setMyLatitude(position.coords.latitude);
    setMyLongitude(position.coords.longitude);
    setSortByLocation(!sortByLocation);
  }

  function denyLocation() {
    setLoading(false);
    setErrorMessage(
      <h4 style={{ color: "red" }}>
        Error: Your location could not be fetched
      </h4>
    );
  }

  function getUserCoordinates() {
    setLoading(true);
    const geo = navigator.geolocation;
    geo.getCurrentPosition(successLocation, denyLocation);
  }

  async function calculateDistancesToGeoLocations(allClouds) {
    const datacenters = await api_post(PROXY_URL, {
      userLongitude: myLongitude,
      userLatitude: myLatitude,
      clouds: allClouds,
    });
    const locationRows = createLocationRows(datacenters.clouds);
    setLoading(false);
    setDataCenterTable(locationRows);
  }

  function createLocationRows(allTheClouds) {
    const allClouds = allTheClouds.map((cloud) => {
      return (
        <tr key={`${cloud["cloud_name"]}`}>
          <td>{cloud["cloud_description"]}</td>
          <td>{cloud["cloud_name"]}</td>
          <td>{cloud?.["distance"] ?? null}</td>
        </tr>
      );
    });

    return (
      <CloudProvividerTable>
        <tbody>
          <tr style={{ textAlign: "left" }}>
            <th>Description</th>
            <th>Region name</th>
            <th>Distance</th>
          </tr>
          {allClouds}
        </tbody>
      </CloudProvividerTable>
    );
  }

  useEffect(() => {
    if (!isEmpty(props.allClouds)) {
      let datacenters;
      if (sortByLocation) {
        calculateDistancesToGeoLocations(props.allClouds);
      } else {
        datacenters = createLocationRows(props.allClouds);
        setLoading(false);
        setDataCenterTable(datacenters);
      }
    }
  }, [sortByLocation, props.allClouds]);

  const sortResultsCheckbox = (
    <CheckboxStyle>
            <input
              type="checkbox"
              id="sortlocation"
              onChange={getUserCoordinates}
              checked={sortByLocation}
            ></input>
            <label style={{ marginLeft: "1vw" }} htmlFor="sortlocation">
              Sort results by my location
            </label>
          </CheckboxStyle>
  )

  return (
    <div style={{ marginTop: "10vh" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {sortResultsCheckbox}
          {errorMessage}
          {dataCenterTable}
        </>
      )}
    </div>
  );
}

const CheckboxStyle = styled.div`
  input[type="checkbox"] {
    transform: scale(2, 2);
  }
`;

const CloudProvividerTable = styled.table`
  margin-top: 2vh;
`;
