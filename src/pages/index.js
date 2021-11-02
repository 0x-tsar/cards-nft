import Head from "next/head";
import styles from "../../styles/Home.module.css";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/context";
import Card from "../Components/Card";

import Router from "next/router";

export const Container = styled.div`
  grid-area: main;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  height: min-content;
  min-height: calc(100vh - 91px);
`;

export default function Home() {
  const {
    nft,
    setNft,
    marketCards,
    setMarketCards,
    myInfos,
    setMyInfos,
    myCards,
    setMyCards,
    search,
    setSearch,
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

  return (
    <Container>
      {myCards.map((item, key) => {
        return (
          <div key={key}>
            <Card card={item} where="home"></Card>
          </div>
        );
      })}
    </Container>
  );
}
