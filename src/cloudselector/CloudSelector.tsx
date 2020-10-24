import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "./parts/Header";
import { FilterClouds } from "./parts/FilterClouds";
import { AvailableClouds } from "./parts/AvailableClouds";
import { mockClouds } from "~/mockclouds.js";

export function CloudSelector(props) {
  const [allClouds, setAllClouds] = useState([]);
  const [cloudProviders, setCloudProviders] = useState();

function parseCloudProviders(clouds){
    const cloudProvds = {}
    clouds.forEach((cloud) => {
        console.log(cloud)
    })
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
