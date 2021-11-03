import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

export const Container = styled.div`
  grid-area: main;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  min-height: calc(100vh - 91px);
  height: min-content;
  color: white;
  font-size: 30px;
`;

const Club = () => {
  const router = useRouter();
  const { club } = router.query;

  return <Container>HELLO FROM CLUB: {club}</Container>;
};

export default Club;
