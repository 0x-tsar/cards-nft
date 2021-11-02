import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import { AuthContext } from "../providers/context";

import Router from "next/router";

export const Container = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center; */

  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  height: min-content;
  min-height: calc(100vh - 91px);
`;

const Market = ({ changeVis }) => {
  const {
    nft,
    setNft,
    marketCards,
    setMarketCards,
    myInfos,
    setMyInfos,
    changed,
    setChanged,
  } = useContext(AuthContext);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setChanged(false);
  //   }, 300);
  // }, []);

  // useEffect(() => {
  //   Router.push("/searcher");
  // }, [changed]);

  marketCards.sort(() => 0.5 - Math.random());

  return (
    <Container>
      {marketCards.map((item, key) => {
        return (
          <div key={key}>
            <Card changeVis={changeVis} card={item} where="market"></Card>
          </div>
        );
      })}
    </Container>
  );
};

export default Market;
