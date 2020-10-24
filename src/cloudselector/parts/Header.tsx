import React from "react";
import styled from "styled-components";
import Aivenlogo from "~/static/aivenlogo.png";

export function Header() {
  return (
    <TopArea>
      <LogoArea>
        <img src={Aivenlogo} style={{ height: "100%" }} />
      </LogoArea>
      <TitleArea>
        <h1>Aivenproxy</h1>
        <p style={{ fontSize: "1.4em" }}>Cloud selection made easy</p>
      </TitleArea>
    </TopArea>
  );
}

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
`;

const LogoArea = styled.div`
  background-color: black;
  height: 80%;
  padding-top: 2vh;
`;

const TopArea = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  height: 20vh;
`;
