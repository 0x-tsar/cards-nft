import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../providers/context";
import confetti from "canvas-confetti";
import axios from "axios";

export const Container = styled.div``;

export const CardHolder = styled.div`
  /* overflow: hidden; */
  width: 180px;
  height: 280px;
  background-color: #000000;

  margin: 10px;

  padding: 0;
  /* max-height: min-content; */

  border-radius: 10px;
  /* position: relative; */
`;

// MAKE A COMPONENT WITH ALL THE CLUBS AND THEIR PAGES
export const LittleWindow = styled.div`
  width: auto;
  height: auto;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 2px solid rgb(0, 0, 0, 0.2);
  z-index: 2;
  position: absolute;
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
  /* width: auto;
  height: auto; */
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  /* 280px; */
  /* 180px; */
  /* 270 */
  /* 260 */
  transform: scale(1);
  transition-duration: 5s;

  :hover {
    transform: scale(1.1) rotate(1.2deg);
    cursor: pointer;
  }
`;

export const ImgBadge = styled.img`
  width: 50px;
  height: 50px;

  transform: scale(1);
  transition-duration: 1s;
  margin-top: -30px;
  /* margin-left: 20px; */
  margin-right: -15px;
  float: right;

  :hover {
    /* transform: scale(1.5) rotate(1.2deg); */
    cursor: pointer;
  }
`;

const Card = ({ card, changeVis, which }) => {
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

  function confetis() {
    var duration = 1 * 300;
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function randomInRange(min, max) {
      var end = Date.now() + 1 * 300;

      // go Buckeyes!
      var colors = ["#00bb6d", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          // spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          // spread: 20,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }

    randomInRange(0, 0);
  }

  const getMetadata = async (metadata) => {
    const data = axios.get(metadata);
    console.log(data.data);
    return data.data.image;
  };

  return (
    <Container>
      <CardHolder
        onClick={async () => {
          if (which === "home") {
            console.log("home..");
          } else if (which === "market" || which === "searcher") {
            const account = myInfos.account;
            // const value = myInfos.web3.utils.toWei("1");
            //adding load screen
            // changeVis("flex", "Buying Card");

            // if (where === "home") {
            //   // ADD HERE SOME OPTIONS TO DO WITH THIS CARDS I OWN
            //   console.log("home");
            // } else if (where === "market") {
            //   console.log("market");
            // confetti({
            //   particleCount: 100,
            //   spread: 70,
            //   origin: { y: 0.5, y: 1.2 },
            // });

            await myInfos.cards.methods
              .buyCardFromMarket(card.id)
              .send({ from: account, value: card.price })
              .then((error, result) => {
                // changeVis("none", "MESSAGE HERE");
                <div style={{ zIndex: "9999999999999" }}>confetis();</div>;
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              })
              .catch((e) => {
                console.log("Not accepted by the user");
                // changeVis("none", "REJECTED");
              });
          } else {
          }
        }}
        onMouseMove={(e) => {
          ref.current.style.display = "flex";
          ref.current.style.left = `${e.pageX + 10}px`;
          ref.current.style.top = `${e.pageY + 10}px`;
          // console.log(window.screen.width);
        }}
        onMouseLeave={(e) => {
          ref.current.style.display = "none";
        }}
      >
        {/* <Img src={card.urlPicture} width={"180px"} height={"280px"}></Img> */}
        <Img src={getMetadata(card)} width={"180px"} height={"280px"}></Img>
        {/* //HARDCODED, CHANGE IT LATER */}
        {card.club.toLowerCase() === "spfc" ? (
          <ImgBadge src="spfc.png" />
        ) : (
          <ImgBadge src="barcelona.png" />
        )}
      </CardHolder>
      <LittleWindow style={{ color: "black" }} ref={ref}>
        <div>{card.title ? card.title : <div></div>}</div>
        <div>{card.owner}</div>
        <div>{card.description}</div>
        <div>price: {parseFloat(card.price) / 10 ** 18}</div>
        <div>id: {card.id}</div>
        <div>club: {card.club}</div>
        <div>
          Create at: {new Date(Number(card.timestamp) * 1000).toTimeString()}
        </div>
        <div>Created By: {card.createdBy}</div>
        <div>Total Amount: {card.totalAmount}</div>
        <br></br>
      </LittleWindow>
    </Container>
  );
};

export default Card;
