import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import { AuthContext } from "../providers/context";

export const Container = styled.div`
  height: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Market = ({ changeVis }) => {
  const { nft, setNft, marketCards, setMarketCards, myInfos, setMyInfos } =
    useContext(AuthContext);

  marketCards.sort(() => 0.5 - Math.random());

  return (
    <Container>
      {marketCards.map((item, key) => {
        return (
          <div key={key}>
            <Card changeVis={changeVis} card={item}></Card>
          </div>
        );
      })}
    </Container>
  );
};

export default Market;
