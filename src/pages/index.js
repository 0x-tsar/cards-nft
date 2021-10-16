import Head from "next/head";
import styles from "../../styles/Home.module.css";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../providers/context";
import Card from "../Components/Card";

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
  } = useContext(AuthContext);

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
