import React, { useRef, useContext } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import { AuthContext } from "../providers/context";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const _cards = [
  {
    card: "./card1.png",
    options: { title: "Luciano", description: "Description 1" },
  },
  {
    card: "./card2.png",
    options: { title: "Hernanes", description: "Description 2" },
  },
  {
    card: "./card3.png",
    options: { title: "Reinaldo", description: "Description 3" },
  },
];

const Market = () => {
  // let date = new Date(Number(item.date) * 1000);
  const { nft, setNft, marketCards, setMarketCards, myInfos, setMyInfos } =
    useContext(AuthContext);
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

export default Market;
