import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "./parts/Header";
import { FilterClouds } from "./parts/FilterClouds";
import { AvailableClouds } from "./parts/AvailableClouds";
import { mockClouds } from "~/mockclouds.js";
import { getCloudProvider, getCloudName } from "~/src/cloudselector/utils/cloudnameparser";

export function CloudSelector(props) {
  const [allClouds, setAllClouds] = useState([]);
  const [cloudProviders, setCloudProviders] = useState({});

  function parseCloudProviders(clouds) {
    const cloudProvs = {};
    clouds.forEach((cloud) => {
      const cloudAlias = getCloudProvider(cloud["cloud_name"]);
      if (!(cloudAlias in cloudProvs)) {
        cloudProvs[cloudAlias] = {
          name: getCloudName(cloud["cloud_description"]),
          regions: [],
          bannedRegions: []
        };
      }
      const region = cloud["geo_region"]
      if (!(cloudProvs[cloudAlias]["regions"].includes(region))){
        cloudProvs[cloudAlias]["regions"].push(region)
      }
    });
    setCloudProviders(cloudProvs);
  }

  useEffect(() => {
    // Using mock-data for now
    if (mockClouds) {
      const clouds = mockClouds.clouds;
      parseCloudProviders(clouds);
      setAllClouds(clouds);
    }
  }, []);

  return (
    <div>
      <Header />
      <div style={{ padding: "5vh" }}>
        <FilterClouds
          cloudProviders={cloudProviders}
          setCloudProviders={setCloudProviders}
        />
        <AvailableClouds allClouds={allClouds} cloudProviders={cloudProviders}/>
      </div>
    </div>
  );
}
