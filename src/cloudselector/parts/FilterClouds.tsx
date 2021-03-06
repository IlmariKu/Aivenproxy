import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { pull } from "lodash";

export function FilterClouds(props) {
  const [cloudProviderHTML, setCloudProviderHTML] = useState([]);

  function banUnbanRegion(clouds, provider, region) {
    let newcloud = { ...clouds };
    if (clouds[provider]["bannedRegions"].includes(region)) {
      pull(clouds[provider]["bannedRegions"], region);
    } else {
      newcloud[provider]["bannedRegions"].push(region);
    }
    props.setCloudProviders(newcloud);
  }

  function createCloudProviderHTML(clouds) {
    const cloudProviders = Object.keys(clouds);
    return (
      <StyledColumns>
        {cloudProviders.map((provider) => {
          return createCloudProviderColumn(provider, clouds);
        })}
      </StyledColumns>
    );
  }

  function createCloudProviderColumn(providerName: string, clouds) {
    const tableRows = clouds[providerName]["regions"].map((region) => {
      return (
        <CloudButton
          onClick={() => banUnbanRegion(clouds, providerName, region)}
          banned={clouds[providerName]["bannedRegions"].includes(region)}
          key={`${providerName}_${region}`}
        >
          {region}
        </CloudButton>
      );
    });

    return (
      <div key={`${providerName}_table`} style={{ marginLeft: "4vh" }}>
        <h3 style={{ textAlign: "center" }}>
          {props.cloudProviders[providerName]["name"]}
        </h3>
        {tableRows}
      </div>
    );
  }

  useEffect(() => {
    if (props.cloudProviders) {
      setCloudProviderHTML(
        createCloudProviderHTML(props.cloudProviders)
        )
    }
  }, [props.cloudProviders]);

  return <div>{cloudProviderHTML}</div>;
}

const StyledColumns = styled.div`
  display: flex;
  flex-direction: row;
`;

const CloudButton = styled.div`
  height: 25px;
  width: 200px;
  background-color: ${(props) => (props.banned ? "#C60101" : "#01C610")};
  border-radius: 15px;
  margin-top: 2vh;
  border: solid;
  text-align: center;
  cursor: pointer;
`;
