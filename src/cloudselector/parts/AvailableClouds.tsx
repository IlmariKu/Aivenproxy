import React from "react";
import { getCloudProvider } from "~/src/cloudselector/utils/cloudnameparser";
import { isEmpty } from "lodash";
import styled from "styled-components";

export function AvailableClouds(props) {
  function successLocation(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  }

  function denyLocation() {
    console.log("Ei ole mahdollista ottaa sijaintiasi.");
  }

  function getUserLocation() {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(successLocation, denyLocation);
  }

  function isRegionBanned(cloudname, region) {
    const provider = getCloudProvider(cloudname);
    const bannedRegions = props.cloudProviders[provider]["bannedRegions"];
    if (bannedRegions.includes(region)) {
      return true;
    }
    return false;
  }

  return (
    <div style={{ marginTop: "10vh" }}>
      <SorterButton onClick={getUserLocation}>Sort by my location</SorterButton>
      <table>
        <tbody>
          {props.allClouds.map((cloud) => {
            if (isRegionBanned(cloud["cloud_name"], cloud["geo_region"])) {
              return;
            }
            return (
              <tr style={{ textAlign: "left" }}>
                <th>{cloud["cloud_description"]}</th>
                <th>{cloud["cloud_name"]}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const SorterButton = styled.div`
  width: 200px;
  border: solid;
  height: 100px;
  background-color: orange;
`;
