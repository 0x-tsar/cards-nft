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
  const [filtered, setFiltered] = useState([]);
  const [changed, setChanged] = useState(false);
  const [isLoading, , setIsLoading] = useState(false);
  const [readyToLoad, setReadyToLoad] = useState(false);
  // const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    const done = async () => {
      const { cards, web3 } = await loadEthereum();
      if (cards && web3) {
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
    };

    //   //   emit cardMinted(
    //   //     card.title,
    //   //     card.id,
    //   //     card.owner,
    //   //     card.price,
    //   //     card.description,
    //   //     card.urlPicture,
    //   //     card.timestamp,
    //   //     card.totalAmount,
    //   //     card.createdBy
    //   // );

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
        filtered,
        setFiltered,
        changed,
        setChanged,
        isLoading,
        setIsLoading,
        readyToLoad,
        // currentTab,
        // setCurrentTab,
        whichTab,
        setWhichTab,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
