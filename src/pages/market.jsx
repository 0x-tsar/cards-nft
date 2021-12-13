import React, { useRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import { AuthContext } from "../providers/context";

import Router from "next/router";

export const Container = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center; */

  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  /* align-content: flex-start; */
  align-content: flex-start;
  /* align-self: flex-start; */
  justify-content: center;
  align-items: center;
  /* background-color: red; */

  /* height: min-content; */
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
    currentTab,
    setCurrentTab,
  } = useContext(AuthContext);

  // useEffect(() => {
  //   Router.push("/searcher");
  // }, [changed]);

  marketCards.sort(() => 0.5 - Math.random());

  return (
    <Container>
      {marketCards.map((item, key) => {
        return (
          <div key={key}>
            <Card
              changeVis={changeVis}
              card={item}
              which={"market"}
              myInfos={myInfos}
            ></Card>
          </div>
        );
      })}
    </Container>
  );
};

export default Market;
