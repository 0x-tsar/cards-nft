import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../providers/context";
import fleekStorage from "@fleekhq/fleek-storage-js";
import Web3 from "web3";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  height: min-content;
  min-height: calc(100vh - 91px);
  color: white;

  form {
    width: 50%;
    height: 20%;
  }
`;

const Create = () => {
  const _price = Web3.utils.toWei("0.011");

  const [newCard, setNewCard] = useState({
    cardAmount: "",
    cardName: "",
    cardPrice: "",
    cardClub: "",
    cardUrlPicture: "",
    cardDescription: "",
  });

  const {
    marketCards,
    setMarketCards,
    myInfos,
    setMyInfos,
    myCards,
    setMyCards,
    whichTab,
    setWhichTab,
    search,
    setSearch,
    filtered,
    setFiltered,
    change,
    setChanged,
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(newCard.cardPrice);

    // console.log(Web3.utils.toWei(newCard.cardPrice));
    if (
      newCard.cardAmount === "" ||
      newCard.cardName === "" ||
      newCard.cardPrice === "" ||
      newCard.cardClub === "" ||
      newCard.cardUrlPicture === "" ||
      newCard.cardDescription === ""
    ) {
      console.log("ERROR! ALL FIELD MUST BE FULLFILED");
      return;
    }

    const cards = await myInfos.cards;
    const account = await myInfos.account;
    const price = myInfos.web3.utils.toWei("0.0001");
    // //first deploy new contract, then gives permission for some account to mint

    // // console.log(account);
    const isCreator = await cards.methods.isCreator(account).call();
    console.log(`${account} isCreator?: ${isCreator}`);

    // const isClubCreator = await cards.methods.isClubCreator("spfc").call();
    // // console.log(`${account} isClubCreator?: ${isClubCreator}`);

    // // console.log("------");
    console.log(
      newCard.cardName,
      Web3.utils.toWei(newCard.cardPrice),
      newCard.cardDescription,
      newCard.cardClub,
      newCard.cardUrlPicture,
      newCard.cardAmount
    );

    await cards.methods
      .mintCards(
        newCard.cardName,
        Web3.utils.toWei(newCard.cardPrice),
        newCard.cardDescription,
        newCard.cardClub,
        newCard.cardUrlPicture,
        newCard.cardAmount
      )
      .send({
        from: account,
        maxPriorityFeePerGas: null,
        maxFeePerGas: null,
      })
      .then((hash) => {
        console.log(hash);
        window.location.href = "http://localhost:3000/market";
      });

    // const tx = await info.bookContract.methods
    //   .createNewBook(state.title, state.price, state.url)
    //   .send({ from: info.currentAddress });
    // console.log(tx);
    // setData((data) => [...data, ""]);

    // console.log(e);
  };

  // <input type="file" onChange={setStorage} />
  const setStorage = async (e) => {
    const data = e.target.files[0];

    try {
      const uploadedFile = await fleekStorage.upload({
        apiKey: "+Gxl/Kv/k+cdc1W4dTyP4Q==",
        apiSecret: "+ldkPR3rw+7jp6j74Koi5/8JHHPD2zwx40uxekH1hEw=",
        key: data.name,
        data: data,
      });

      // const uploadedFile = { hash: "HASH_EXAMLE" };

      // const tx = await info.bookContract.methods
      //   .createNewBook("book 2", value, bookUrl)
      //   .send({ from: info.currentAddress });
      // console.log(tx);

      console.log(`picture was uploaded to IPFS`);
      console.log(uploadedFile);
      //first try with IPFS later with Fleek
      // setState({ ...state, url: `https://ipfs.io/ipfs/${uploadedFile.hash}`});

      // setVideo(`https://ipfs.io/ipfs/${uploadedFile.hash}`);
      setNewCard({
        ...newCard,
        cardUrlPicture: `https://ipfs.io/ipfs/${uploadedFile.hash}`,
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };
  return (
    <Container>
      {/* CARD NAME */}
      {/* CARD NAME */}

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="cardName">Card Name</label>
          <input
            defaultValue={newCard.cardName}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              setNewCard({ ...newCard, cardName: e.target.value });
            }}
            type="text"
            className="form-control p-3"
            id="cardName"
            aria-describedby="cardName"
            placeholder="Card Name"
          />
          <small id="cardName" className="form-text text-muted">
            Type the Card's Title
          </small>
        </div>

        {/* CARD PRICE */}
        {/* CARD PRICE */}
        <div className="form-group">
          <label htmlFor="cardPrice">Card Price</label>
          <input
            defaultValue={newCard.cardPrice}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              setNewCard({ ...newCard, cardPrice: e.target.value });
            }}
            type="text"
            className="form-control p-3"
            id="cardPrice"
            aria-describedby="cardPrice"
            placeholder="Card Price"
          />
          <small id="cardPrice" className="form-text text-muted">
            What will be the cost of each card
          </small>
        </div>

        {/* CLUB NAME */}
        {/* CLUB NAME */}
        <div className="form-group">
          <label htmlFor="cardClub">Club Name</label>
          <input
            defaultValue={newCard.cardClub}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              setNewCard({ ...newCard, cardClub: e.target.value });
            }}
            type="text"
            className="form-control p-3"
            id="cardClub"
            aria-describedby="cardClub"
            placeholder="Card Club"
          />
          <small id="cardClub" className="form-text text-muted">
            Club's name
          </small>
        </div>

        {/* CARD AMOUNT */}
        {/* CARD AMOUNT */}
        <div className="form-group">
          <label htmlFor="cardAmount">Card Amount</label>
          <input
            defaultValue={newCard.cardAmount}
            onChange={(e) => {
              console.log(e.currentTarget.value);

              setNewCard({ ...newCard, cardAmount: e.target.value });
            }}
            type="text"
            className="form-control p-3"
            id="cardAmount"
            aria-describedby="cardAmount"
            placeholder="Card Amount"
          />
          <small id="cardAmount" className="form-text text-muted">
            You must be allowed to create a card for your club
          </small>
        </div>

        {/* CARD INPUT */}
        {/* CARD INPUT */}
        <div className="form-group">
          <label htmlFor="cardUrlPicture">Picture Url</label>
          <input
            type="file"
            onChange={setStorage}
            defaultValue={newCard.cardUrlPicture}
            className="form-control p-3"
            id="cardUrlPicture"
            aria-describedby="cardUrlPicture"
            // placeholder="Card Input"
          />
          <small id="cardUrlPicture" className="form-text text-muted">
            Pick the image of your card, see the rules here: www...
          </small>
        </div>

        <br />
        <div className="form-group">
          <label htmlFor="cardDescription">Card Description</label>
          <textarea
            className="form-control"
            id="cardDescription"
            rows="5"
            placeholder="Put the card description all of your new minted cards will have."
            onChange={(e) => {
              setNewCard({ ...newCard, cardDescription: e.target.value });
            }}
          ></textarea>
        </div>
        {/* <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <br />
        <button type="submit" className="btn btn-primary btn-lg">
          Create Card
        </button>
      </form>
    </Container>
  );
};

export default Create;
