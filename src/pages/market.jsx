import React, { useRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import { AuthContext } from "../providers/context";
import axios from "axios";

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

  let initialNfts = [
    {
      name: "",
      symbol: "",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [state, setState] = useState([]);
  const [nfts, setNfts] = useState(initialNfts);

  // useEffect(() => {
  //   Router.push("/searcher");
  // }, [changed]);

  useEffect(() => {
    async function getMetadataFromIpfs(tokenURI) {
      let metadata = await axios.get(tokenURI);
      return metadata.data;
    }

    const done = async () => {
      try {
        let numberOfNfts = await myInfos.cards.methods.totalSupply().call();
        console.log(numberOfNfts);

        let tempArray = [];
        let baseUrl = "";

        for (let i = 0; i < numberOfNfts; i++) {
          let tokenURI = await myInfos.cards.methods.tokenURI(i).call();
          console.log(tokenURI);
          let metadata = await getMetadataFromIpfs(tokenURI);
          tempArray.push(metadata);
        }
        setNfts(tempArray);
        // console.log(tempArray);
        // setState(myInfos.)
      } catch (error) {}
    };

    done();

    //
  }, [myInfos]);

  marketCards.sort(() => 0.5 - Math.random());

  // console.log(nfts[0]);

  console.log(nfts[0]);
  console.log(nfts[4]);
  return (
    <Container>
      {marketCards.map((item, key) => {
        return (
          <div key={key}>
            {/* <Card
              changeVis={changeVis}
              card={item}
              which={"market"}
              NFT={nfts[key]}
            ></Card> */}
          </div>
        );
      })}
    </Container>
  );
};

export default Market;
