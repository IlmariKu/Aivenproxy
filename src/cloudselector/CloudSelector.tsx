import React, { useState, useEffect } from "react";
import { Header } from "./parts/Header";
import { FilterClouds } from "./parts/FilterClouds";
import { AvailableClouds } from "./parts/AvailableClouds";
import { api_get } from "~/src/utils/api.ts";
import { getCloudProvider, getCloudName } from "~/src/cloudselector/utils/cloudnameparser";

const PROXY_URL = "http://localhost/get_clouds"

export function CloudSelector(props) {
  const [allClouds, setAllClouds] = useState([]);
  const [filteredClouds, setFilteredClouds] = useState([]);
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

  async function fetchAvailableClouds(){
    const clouds = await api_get(PROXY_URL)
    parseCloudProviders(clouds["clouds"]);
    setAllClouds(clouds["clouds"]);
  }


  function isCloudLocationBanned(cloud){
    const cloudname = cloud["cloud_name"]
    const region = cloud["geo_region"]
      const provider = getCloudProvider(cloudname);
      const bannedRegions = cloudProviders[provider]["bannedRegions"];
      if (bannedRegions.includes(region)) {
        return false;
      }
      return true;
  }

  useEffect(() => {
    fetchAvailableClouds()
  }, []);

  useEffect(() => {
    const filtered = allClouds.filter(cloud => isCloudLocationBanned(cloud))
    setFilteredClouds(filtered)
  }, [cloudProviders]);

  return (
    <div>
      <Header />
      <div style={{ padding: "5vh" }}>
        <FilterClouds
          cloudProviders={cloudProviders}
          setCloudProviders={setCloudProviders}
        />
        <AvailableClouds allClouds={filteredClouds} />
      </div>
    </div>
  );
}
