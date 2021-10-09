import React, { useContext } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import styled from "styled-components";
import { AuthContext } from "../providers/context";
import Card from "../Components/Card";

export const Container = styled.div`
  grid-area: main;
`;

export default function Home() {
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
}
