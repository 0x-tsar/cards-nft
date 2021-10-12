import React, { createContext, useEffect, useState } from "react";
import loadEthereum from "../ethereum";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [nft, setNft] = useState(undefined);
  const [myCards, setMyCards] = useState([]);
  const [marketCards, setMarketCards] = useState([]);
  const [myInfos, setMyInfos] = useState([]);

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

          console.log(item);
          setMarketCards((marketCards) => [...marketCards, item]);
        }
      }
      //////////////////////
      //////////////////////
      //////////////////////
      // reading users items

      const account = await web3.currentProvider.selectedAddress;
      const balanceUser = await cards.methods.balanceOf(account).call();
      console.log(`balance user: ${balanceUser}`);
      for (let i = 0; i < balanceUser; i++) {
        const tokenId = await cards.methods
          .tokenOfOwnerByIndex(account, i)
          .call();
        const token = await cards.methods.tokenByIndex(tokenId).call();
        const item = await cards.methods.marketCards(account, token).call();

        console.log(item);
        setMyCards((myCards) => [...myCards, item]);
      }
    };

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
