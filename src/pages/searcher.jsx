import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/context";
import styled from "styled-components";
import Card from "../Components/Card";

export const Container = styled.div`
  /* background-color: #1f262f; */
  color: white;
  /* width: 100%; */
  /* height: 100vh; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;

  height: min-content;
  min-height: calc(100vh - 90px);

  /* min-height: max-content; */
  /* justify-content: center; */
  /* flex-wrap: wrap; */
`;

const Searcher = ({ changedVis }) => {
  // const [allCards, setAllCards] = useState([]);
  const {
    myInfos,
    search,
    setSearch,
    marketCards,
    filtered,
    setFiltered,
    changed,
    setChanged,
  } = useContext(AuthContext);

  useEffect(() => {
    if (changed) {
      setFiltered([]);
      const done = async () => {
        const cards = myInfos.cards;
        if (cards) {
          setChanged(false);
          setFiltered([]);
          const lowerSearch = search.toLowerCase();
          //getting the creator of searched team
          const clubAddress = await cards.methods
            .clubToCreator(lowerSearch)
            .call();

          // console.log(`clubaddress: ${clubAddress}`);
          if (clubAddress === "0x0000000000000000000000000000000000000000")
            return;
          // const market = await cards.methods.marketCards().call();
          // mapping(address => mapping(uint256 => Card)) public marketCards;

          const balance = await cards.methods.balanceOf(cards._address).call();
          for (let i = 0; i < balance; i++) {
            const tokenId = await cards.methods
              .tokenOfOwnerByIndex(cards._address, i)
              .call();
            const token = await cards.methods.tokenByIndex(tokenId).call();
            const item = await cards.methods
              .marketCards(cards._address, token)
              .call();

            // console.log(`club address ${clubAddress}`);
            if (item.createdBy === clubAddress) {
              setFiltered((filtered) => [...filtered, item]);
            }

            // setMyCards((myCards) => [...myCards, item]);
          }
        }
      };
      done();
    }
  }, [changed]);

  return (
    <Container>
      {filtered.map((item, key) => {
        return (
          <Card
            // changedVis={changedVis}
            key={key}
            card={item}
            which={"searcher"}
          ></Card>
        );
      })}
    </Container>
  );
};

export default Searcher;
