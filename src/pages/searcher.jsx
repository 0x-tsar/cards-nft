import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/context";
import styled from "styled-components";
import Web3 from "web3";

export const Container = styled.div`
  background-color: #1f262f;
  color: white;
`;

const Searcher = () => {
  // const [allCards, setAllCards] = useState([]);
  const {
    myInfos,
    search,
    setSearch,
    marketCards,
    filtered,
    setFiltered,
    change,
    setChanged,
  } = useContext(AuthContext);

  useEffect(() => {
    if (change) {
      console.log("called");

      setChanged(false);

      setFiltered([]);

      const done = async () => {
        const cards = myInfos.cards;
        if (cards && filtered.length == 0) {
          const lowerSearch = search.toLowerCase();
          //getting the creator of searched team
          const clubAddress = await cards.methods
            .clubToCreator(lowerSearch)
            .call();
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

            // if (item.createdBy === "0x95a2bA7C5F810b286dAF8d251aBaF188126640f0") {
            //   setFiltered((filtered) => [...filtered, item]);
            // }

            // setMyCards((myCards) => [...myCards, item]);
          }
        }
      };
      done();
    }
  }, [change]);

  return <Container>{search}</Container>;
};

export default Searcher;
