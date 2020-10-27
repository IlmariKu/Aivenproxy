import React, { useEffect, useState } from "react";
import { getCloudProvider } from "~/src/cloudselector/utils/cloudnameparser";
import { isEmpty, sortBy } from "lodash";
import styled from "styled-components";

export function AvailableClouds(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [sortByLocation, setSortByLocation] = useState(false);
  const [cloudLocations, setCloudLocations] = useState([]);
  const [myLatitude, setMyLatitude] = useState(null);
  const [myLongitude, setMyLongitude] = useState(null);

  function successLocation(position) {
    setMyLatitude(position.coords.latitude);
    setMyLongitude(position.coords.longitude);
    setSortByLocation(!sortByLocation);
  }

  function distanceTo(lat1, lon1, lat2, lon2) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist * 1.609344;
  }

  function sortResultsByDistance(results, myLat, myLon) {
    const resultsWithDistance = results.map((location) => {
      location["distance"] = distanceTo(
        myLat,
        myLon,
        location["geo_latitude"],
        location["geo_longitude"]
      );
      return location;
    });
    return sortBy(resultsWithDistance, "distance");
  }

  function denyLocation() {
    console.error("Its not possible to fetch your location");
  }

  function getUserLocation() {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(successLocation, denyLocation);
  }

  function createLocationRows(allTheClouds) {
    const allClouds = allTheClouds.map((cloud) => {
      return (
        <tr style={{ textAlign: "left" }}>
          <th>{cloud["cloud_description"]}</th>
          <th>{cloud["cloud_name"]}</th>
        </tr>
      );
    });

    return (
      <table>
        <tbody>{allClouds}</tbody>
      </table>
    );
  }

  useEffect(() => {
    if (!isEmpty(props.allClouds)) {
      let rows;
      if (sortByLocation) {
        rows = createLocationRows(
          sortResultsByDistance(props.allClouds, myLatitude, myLongitude)
        );
      } else {
        rows = createLocationRows(props.allClouds);
      }
      setCloudLocations(rows);
    }
  }, [sortByLocation, props.allClouds]);

  return (
    <div style={{ marginTop: "10vh" }}>
      <CheckboxStyle>
        <input
          type="checkbox"
          id="sortlocation"
          onChange={getUserLocation}
          checked={sortByLocation}
        ></input>
        <label style={{ marginLeft: "1vw" }} htmlFor="sortlocation">
          Sort results by my location
        </label>
      </CheckboxStyle>
      {cloudLocations}
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
