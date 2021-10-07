import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  /* width: 100vw;
  height: 50px; */
  background-color: black;
  display: flex;
  grid-area: "header";
`;

const Header = () => {
  return <Container></Container>;
};

export default Header;
