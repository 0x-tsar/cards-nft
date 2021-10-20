import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../providers/context";
import fleekStorage from "@fleekhq/fleek-storage-js";

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
  const [newCard, setNewCard] = useState([]);

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

    //check if all fields all fullfiled

    console.log(newCard);

    if (
      newCard.amount === "" &&
      newCard.cardName === "" &&
      newCard.cardPrice === "" &&
      newCard.club === "" &&
      newCard.urlPicture === "" &&
      newCard.description === ""
    ) {
      console.log("ERROR! ALL FIELD MUST BE FULLFILED");
      return;
    }

    const cards = await myInfos.cards;
    const account = await myInfos.account;
    const price = myInfos.web3.utils.toWei("0.011");
    //call contract Mintcard here..
    //first deploy new contract, then gives permission for some account to mint

    // console.log(
    //   newCard.amount,
    //   newCard.cardName,
    //   newCard.cardPrice,
    //   newCard.club,
    //   newCard.urlPicture,
    //   newCard.description
    // );

    // string memory _title,
    // uint256 _price,
    // string memory _description,
    // string memory _club,
    // string memory _urlPicture,
    // uint256 _totalAmount

    // const isCreator = await cards.methods.isCreator(account).call();
    // console.log(`${account} isCreator?: ${isCreator}`);

    console.log(
      newCard.cardName,
      parseInt(newCard.cardPrice),
      newCard.club,
      newCard.urlPicture,
      parseInt(newCard.amount),
      newCard.description
    );

    await cards.methods
      .mintCards(
        newCard.cardName,
        newCard.cardPrice,
        newCard.club,
        newCard.urlPicture,
        newCard.amount,
        newCard.description
      )
      .send({ from: account });

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
      // const uploadedFile = await fleekStorage.upload({
      //   apiKey: "+Gxl/Kv/k+cdc1W4dTyP4Q==",
      //   apiSecret: "+ldkPR3rw+7jp6j74Koi5/8JHHPD2zwx40uxekH1hEw=",
      //   key: data.name,
      //   data: data,
      // });

      const uploadedFile = { hash: "HASH_EXAMLE" };

      // const tx = await info.bookContract.methods
      //   .createNewBook("book 2", value, bookUrl)
      //   .send({ from: info.currentAddress });
      // console.log(tx);

      console.log(`picture was uploaded to IPFS`);
      console.log(uploadedFile);
      // setState({ ...state, url: uploadedFile.hash });
      //first try with IPFS later with Fleek
      // setState({ ...state, url: `https://ipfs.io/ipfs/${uploadedFile.hash}`});

      // setVideo(`https://ipfs.io/ipfs/${uploadedFile.hash}`);
      setNewCard({
        ...newCard,
        urlPicture: `https://ipfs.io/ipfs/${uploadedFile.hash}`,
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
          <label htmlFor="exampleInputEmail1">Card Name</label>
          <input
            value={newCard.name}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              // setNewCard({
              //   ...(newCard) => {
              //     newCard, e.currentTarget.value;
              //   },
              // });
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
            value={newCard.price}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              // setNewCard({
              //   ...(newCard) => {
              //     newCard, e.currentTarget.value;
              //   },
              // });
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
          <label htmlFor="clubName">Club Name</label>
          <input
            value={newCard.clubName}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              // setNewCard({
              //   ...(newCard) => {
              //     newCard, e.currentTarget.value;
              //   },
              // });

              setNewCard({ ...newCard, club: e.target.value });
            }}
            type="text"
            className="form-control p-3"
            id="clubName"
            aria-describedby="clubName"
            placeholder="Club Name"
          />
          <small id="clubDescription" className="form-text text-muted">
            You must be allowed to create a card for your club
          </small>
        </div>

        {/* CARD AMOUNT */}
        {/* CARD AMOUNT */}
        <div className="form-group">
          <label htmlFor="cardAmount">Card Amount</label>
          <input
            value={newCard.cardAmount}
            onChange={(e) => {
              console.log(e.currentTarget.value);

              setNewCard({ ...newCard, amount: e.target.value });
            }}
            type="text"
            className="form-control p-3"
            id="cardAmount"
            aria-describedby="cardAmount"
            placeholder="Card Amount"
          />
          <small id="clubDescription" className="form-text text-muted">
            You must be allowed to create a card for your club
          </small>
        </div>

        {/* CARD INPUT */}
        {/* CARD INPUT */}
        <div className="form-group">
          <label htmlFor="pictureUrl">Picture Url</label>
          <input
            type="file"
            onChange={setStorage}
            value={newCard.pictureUrl}
            className="form-control p-3"
            id="pictureUrl"
            aria-describedby="pictureUrl"
            // placeholder="Card Input"
          />
          <small id="pictureUrl" className="form-text text-muted">
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
              setNewCard({ ...newCard, description: e.target.value });
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
