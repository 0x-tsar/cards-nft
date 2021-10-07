import React, { useRef } from "react";
import styled from "styled-components";
import Card from "../Components/Card";

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
  return (
    <Container>
      {_cards.map((item, key) => {
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
