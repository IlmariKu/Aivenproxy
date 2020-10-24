import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "./parts/Header";
import { FilterClouds } from "./parts/FilterClouds";
import { AvailableClouds } from "./parts/AvailableClouds";
import { mockClouds } from "~/mockclouds.js";

export function CloudSelector(props) {
  const [allClouds, setAllClouds] = useState([]);
  const [cloudProviders, setCloudProviders] = useState({});
  const [bannedProviders, setBannedCloudProviders] = useState([]);


function getCloudName(cloudName){
    return cloudName.slice(
        cloudName.indexOf("-") + 2,
        cloudName.indexOf(":"),
    )
}

function getCloudAlias(cloudName){
    return cloudName.slice(0, cloudName.indexOf("-"))
}

function parseCloudProviders(clouds){
    const cloudProvs = {}
    clouds.forEach((cloud) => {
        const cloudAlias = getCloudAlias(cloud["cloud_name"])
        if (!(cloudAlias in cloudProvs)){
            cloudProvs[cloudAlias] = {
                "name": getCloudName(cloud["cloud_description"])
            }
        }
    })
    setCloudProviders(cloudProvs)
}

  useEffect(() => {
    // Using mock-data for now
    if (mockClouds){
    const clouds = mockClouds.clouds;
    parseCloudProviders(clouds)
    setAllClouds(clouds);
    }
  }, []);

  return (
    <div>
      <Header />
      <div style={{ padding: "5vh" }}>
        <FilterClouds
          setCloudProviders={setCloudProviders}
          cloudProviders={cloudProviders}
        />
        <AvailableClouds />
      </div>
    </div>
  );
}
