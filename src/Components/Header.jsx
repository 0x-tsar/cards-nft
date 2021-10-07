import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  background-color: black;
  grid-area: header;
  display: flex;
`;

const Header = () => {
  return <Container></Container>;
};

export default Header;
