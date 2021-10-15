import React, { useContext } from "react";
import { AuthContext } from "../providers/context";
import styled from "styled-components";

export const Container = styled.div`
  background-color: #1f262f;
  color: white;
`;

const Searcher = () => {
  const { myInfos, search, setSearch } = useContext(AuthContext);

  console.log(`searcher: ${search}`);

  return <Container>searcher</Container>;
};

export default Searcher;
