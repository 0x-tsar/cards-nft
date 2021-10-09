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
  height: auto;
  /* word-wrap: break-word; */
  word-break: break-all;
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
  transform: scale(1);
  transition-duration: 5s;

  :hover {
    transform: scale(1.1) rotate(1.2deg);
    cursor: pointer;
  }
`;

const Card = ({ card }) => {
  const ref = useRef();
  const { nft, setNft, marketCards, setMarketCards, myInfos, setMyInfos } =
  useContext(AuthContext);

  return (
    <Container>
      <CardHolder
        onClick={async (e) => {
          console.log(card);
          const currentAccount = myInfos.currentAddress 
          const value = myInfos.web3.utils.toWei('0.1');
          const price = card.price
          // console.log(currentAccount);
          // console.log(value);
          // console.log(nft);
          // const tx =  nft.methods.addAdmin("0x6599cA2767Fa78bE271ef85557E755C6687Ee3Ca");
          // console.log(tx);
          const tx = await nft.methods.buyCardFromMarket(card.id).send({from: currentAccount, value: price});
          console.log(tx);

          // instance.deposit(myData, {value: 100, from: myAccount, to: instance.address});

          window.location.reload()

        //   function buyCardFromMarket(uint256 _idCard)
        // external
        // payable
        // returns (bool)
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
        <div>{card.id}</div> <br />
        <div>{card.owner}</div> <br />
        <div>{card.title}</div>
        <br />
        <div>{card.description}</div>
        <br />
        <div>{card.price}</div>
        <br />
        <div>{new Date(Number(card.timestamp) * 1000).toTimeString()}</div>
        <br />
        <br></br>
      </LittleWindow>
    </Container>
  );
};

export default Card;
