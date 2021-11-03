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
  align-content: flex-start;
  justify-content: center;

  min-height: calc(100vh - 91px);
  height: min-content;
`;

export default function Home({ changeVis }) {
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
    isLoading,
    setIsLoading,
    readyToLoad,
  } = useContext(AuthContext);

  return (
    <Container>
      {myCards.map((item, key) => {
        return (
          <div key={key}>
            <Card card={item} where="home" changeVis={changeVis}></Card>
          </div>
        );
      })}
    </Container>
  );
}
