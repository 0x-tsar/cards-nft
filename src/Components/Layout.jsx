import React from "react";
import styled from "styled-components";
import Header from "./Header";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: blue;
  display: flex;
`;

const Layout = () => {
  return (
    <Container>
      <Header></Header>
    </Container>
  );
};

export default Layout;
