import React, { useState, useEffect } from "react";
import styled from "styled-components";

export function FilterClouds(props) {
  const [cloudButtons, setCloudButtons] = useState([]);

  function createCloudButtons(clouds) {
    const buttons = Object.keys(clouds).map((name) => {
      return (
        <tr key={name}>
          <td>{clouds[name].name}</td>
          <td>
            <CloudButton show={name === "aws"} key={name}>
              {(name === "aws") ? "Yes" : "No"}
            </CloudButton>
          </td>
        </tr>
      );
    });
    return (
      <StyledTable>
        <table>
          <tbody>
            <tr>
              <th>Cloud name</th>
              <th>Show</th>
            </tr>
            {buttons}
          </tbody>
        </table>
      </StyledTable>
    );
  }

  useEffect(() => {
    if (props.cloudProviders) {
      const cloudTable = createCloudButtons(props.cloudProviders);
      setCloudButtons(cloudTable);
    }
  }, [props.cloudProviders]);

  return <div>{cloudButtons}</div>;
}

const StyledTable = styled.div`
  th,
  td {
    padding-right: 35px;
    padding-left: 35px;
  }
`;

const CloudButton = styled.div`
  height: 50px;
  width: 200px;
  background-color: ${(props) => (props.show ? "#01C610" : "#C60101")};
  border-radius: 15px;
  margin-top: 2vh;
  border: solid;
  text-align: center;
  cursor: pointer;
`;
