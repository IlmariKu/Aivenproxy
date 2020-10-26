import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { pull } from "lodash";

export function FilterClouds(props) {
  const [cloudButtons, setCloudButtons] = useState([]);

  function banUnbanProvider(clouds, provider, region) {
    let newcloud = { ...clouds };
    if (clouds[provider]["bannedRegions"].includes(region)) {
      pull(clouds[provider]["bannedRegions"], region)
    } else {
      newcloud[provider]["bannedRegions"].push(region)
    }
    props.setCloudProviders(newcloud)
  }

  function createRegionTables(clouds) {
    const cloudProviders = Object.keys(clouds);
    return cloudProviders.map((provider) => {
      return createTable(provider, clouds);
    });
  }

  function createTable(providerName: string, clouds) {
    const tableRows = clouds[providerName]["regions"].map((region) => {
      return (
        <div key={`${providerName}_${region}`}>
          <>
            <CloudButton
              onClick={() => banUnbanProvider(clouds, providerName, region)}
              banned={clouds[providerName]["bannedRegions"].includes(region)}
              key={region}
            >
              {region}
            </CloudButton>
          </>
        </div>
      );
    });

    return (
      <StyledRows>
        <h3>{providerName}</h3>
          {tableRows}
      </StyledRows>
    );
  }

  useEffect(() => {
    if (props.cloudProviders) {
      const cloudTable = createRegionTables(props.cloudProviders);
      setCloudButtons(cloudTable);
    }
  }, [props.cloudProviders]);

  return <div>{cloudButtons}</div>;
}

const StyledRows = styled.div`

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
