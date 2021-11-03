import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import { AuthContext } from "../providers/context";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  height: min-content;
  min-height: calc(100vh - 91px);
`;

const Searcher = () => {
  const {
    nft,
    setNft,
    marketCards,
    setMarketCards,
    myInfos,
    setMyInfos,
    changed,
    setChanged,
    readyToLoad,
  } = useContext(AuthContext);

  // marketCards.sort(() => 0.5 - Math.random());

  return (
    <Container>
      {marketCards.map((item, key) => {
        return (
          <div key={key}>
            <Card card={item}></Card>
          </div>
        );
      })}
    </Container>
  );
};

export default Searcher;
