import React from "react";
import { getCloudProvider } from "~/src/cloudselector/utils/cloudnameparser";
import { isEmpty } from "lodash";

export function AvailableClouds(props) {

    function isRegionBanned(cloudname, region){
        const provider = getCloudProvider(cloudname)
        const bannedRegions = props.cloudProviders[provider]["bannedRegions"]
        if (bannedRegions.includes(region)){
            return true
        }
        return false
    }

  return (
    <div style={{ marginTop: "10vh" }}>
      <table>
        <tbody>
          {props.allClouds.map((cloud) => {
              if (isRegionBanned(cloud["cloud_name"], cloud["geo_region"])){
                  return
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
