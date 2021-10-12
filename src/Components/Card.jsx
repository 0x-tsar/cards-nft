import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../providers/context";

export const Container = styled.div``;

export const CardHolder = styled.div`
  width: 200px;
  height: 300px;
  background-color: #000000;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin: 10px;
  border-radius: 10px;
`;

// MAKE A COMPONENT WITH ALL THE CLUBS AND THEIR PAGES
export const LittleWindow = styled.div`
  width: 200px;
  height: 100px;
  background-color: rgb(255, 255, 255);
  /* background-color: rgb(140, 0, 107);
  color: white; */
  border-radius: 10px;
  border: 2px solid rgb(0, 0, 0, 0.2);
  z-index: 999;
  position: absolute;
  /* left: 100px;
  top: 100px; */
  color: black;
  cursor: default;
  pointer-events: none;
  padding: 10px;
  display: none;

  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Img = styled.img`
  width: 150px;
  height: 250px;
  /* 270 */
  /* 260 */
  transform: scale(1);
  transition-duration: 5s;

  :hover {
    transform: scale(1.1) rotate(1.2deg);
    cursor: pointer;
  }
`;

const Card = ({ card }) => {
  const ref = useRef();

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
      <CardHolder
        onClick={async () => {
          const account = myInfos.account;
          const value = myInfos.web3.utils.toWei("0.01");
          // account: account,
          // balanceEther: balanceEther,
          // cards: cards,
          // web3: web3,

          console.log(card.id);
          // const tx = await myInfos.cards.methods
          //   .buyCardFromMarket(card.id)
          //   .send({ from: account, value: value });

          // console.log(tx);
          // //update
          // window.location.reload();
        }}
        onMouseMove={(e) => {
          ref.current.style.display = "flex";
          ref.current.style.left = `${e.pageX + 10}px`;
          ref.current.style.top = `${e.pageY + 10}px`;
        }}
        onMouseLeave={(e) => {
          ref.current.style.display = "none";
        }}
      >
        <Img src={card.urlPicture}></Img>
      </CardHolder>
      <LittleWindow style={{ color: "black" }} ref={ref}>
        <div>{card.title ? card.title : <div></div>}</div>
        <div>{card.owner}</div>
        <div>{card.description}</div>
        <div>{card.price}</div>
        <br></br>
      </LittleWindow>
    </Container>
  );
};

export default Card;
