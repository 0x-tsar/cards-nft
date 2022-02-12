import Head from "next/head";
import styles from "../../styles/Home.module.css";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/context";
import Card from "../Components/Card";
import axios from "axios";
// import Router from "next/router";

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
    currentTab,
    setCurrentTab,
    whichTab,
    setWhichTab,
  } = useContext(AuthContext);

  let initialNfts = [
    {
      name: "",
      symbol: "",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [state, setState] = useState([]);
  const [nfts, setNfts] = useState(initialNfts);

  useEffect(() => {
    async function getMetadataFromIpfs(tokenURI) {
      let metadata = await axios.get(tokenURI);
      return metadata.data;
    }

    const done = async () => {
      try {
        let numberOfNfts = await myInfos.cards.methods.totalSupply().call();

        let tempArray = [];
        let baseUrl = "";

        for (let i = 0; i < numberOfNfts; i++) {
          let tokenURI = await myInfos.cards.methods.tokenURI(i).call();

          let metadata = await getMetadataFromIpfs(tokenURI);
          tempArray.push(metadata);
        }

        setNfts(tempArray);
      } catch (error) {
        console.error(error);
      }
    };

    done();

    //
  }, [myInfos]);

  return (
    <Container>
      {myCards.map((item, key) => {
        return (
          <div key={key}>
            <Card
              card={item}
              changeVis={changeVis}
              which={"home"}
              NFT={nfts[key]}
            ></Card>
          </div>
        );
      })}
    </Container>
  );
}
