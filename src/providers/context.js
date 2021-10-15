import React, { createContext, useEffect, useState } from "react";
import loadEthereum from "../ethereum";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [nft, setNft] = useState(undefined);
  const [myCards, setMyCards] = useState([]);
  const [marketCards, setMarketCards] = useState([]);
  const [myInfos, setMyInfos] = useState([]);
  const [whichTab, setWhichTab] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const done = async () => {
      const { cards, web3 } = await loadEthereum();
      if (cards && web3) {
        const account = await web3.currentProvider.selectedAddress;
        // console.log(await cards.methods.admin().call());
        const balance = await cards.methods.balanceOf(cards._address).call();
        console.log(balance);
        for (let i = 0; i < balance; i++) {
          const tokenId = await cards.methods
            .tokenOfOwnerByIndex(cards._address, i)
            .call();
          const token = await cards.methods.tokenByIndex(tokenId).call();
          const item = await cards.methods
            .marketCards(cards._address, token)
            .call();

          // console.log(item);
          setMarketCards((marketCards) => [...marketCards, item]);
        }
      }
      //////////////////////
      //////////////////////
      //////////////////////
      // reading users items

      const account = await web3.currentProvider.selectedAddress;
      const balanceEther = await web3.eth.getBalance(account);
      setMyInfos({
        account: account,
        balanceEther: balanceEther,
        cards: cards,
        web3: web3,
      });

      const balanceUser = await cards.methods.balanceOf(account).call();
      console.log(`balance user: ${balanceUser}`);
      for (let i = 0; i < balanceUser; i++) {
        const tokenId = await cards.methods
          .tokenOfOwnerByIndex(account, i)
          .call();
        const token = await cards.methods.tokenByIndex(tokenId).call();
        const item = await cards.methods.myCards(account, token).call();
        // console.log(item);

        setMyCards((myCards) => [...myCards, item]);
      }

      cards.events
        .cardMinted({})
        .on("data", async function (event) {
          console.log(event.returnValues);
          // Do something here
          setMarketCards((marketCards) => [...marketCards, event.returnValues]);
        })
        .on("error", console.error);
    };

    //   emit cardMinted(
    //     card.title,
    //     card.id,
    //     card.owner,
    //     card.price,
    //     card.description,
    //     card.urlPicture,
    //     card.timestamp,
    //     card.totalAmount,
    //     card.createdBy
    // );

    done();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        nft,
        setNft,
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
