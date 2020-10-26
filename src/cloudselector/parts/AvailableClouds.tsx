import React from "react";

export function AvailableClouds(props) {
  return (
    <div style={{ marginTop: "10vh" }}>
      <table>
        <tbody>
          {props.allClouds.map((cloud) => {
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
