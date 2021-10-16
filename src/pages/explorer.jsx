import React, { useContext } from "react";
import { AuthContext } from "../providers/context";

import styled from "styled-components";

export const Container = styled.div`
  background-color: #1f262f;
  color: white;

  height: min-content;
  min-height: calc(100vh - 91px);
`;

const Explorer = () => {
  return <Container></Container>;
};

export default Explorer;
