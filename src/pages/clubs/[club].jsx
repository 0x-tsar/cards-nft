import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AuthContext } from "../../providers/context";
import Card from "../../Components/Card";
import loadEthereum from "../../ethereum";

export const Container = styled.div`
  grid-area: main;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  min-height: calc(100vh - 91px);
  height: min-content;
  color: white;
  font-size: 30px;
`;

const Club = () => {
  const router = useRouter();
  const { club } = router.query;

  const [clubCards, setClubCards] = useState([]);

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

  const done = async () => {
    const { cards, web3 } = await loadEthereum();
    console.log(cards);
    if (cards && web3) {
      const account = await web3.currentProvider.selectedAddress;
      const balanceEther = await web3.eth.getBalance(account);

      console.log(club);
      // const thisCards = await cards.methods.clubToCreator(club).call();
      // console.log(thisCards);
      // const balanceUser = await cards.methods.balanceOf(account).call();
    }
  };

  done();

  return (
    <Container>
      {clubCards.map((item, key) => {
        return (
          <div key={key}>
            <Card
              card={item}
              // changeVis={changeVis}
              which={"clubs"}
            ></Card>
          </div>
        );
      })}
    </Container>
  );

  return <Container>HELLO FROM CLUB: {club}</Container>;
};

export default Club;
