import React, { createContext, useEffect, useState, useContext } from "react";
import loadEthereum from "../ethereum";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [nft, setNft] = useState(undefined);
  const [myCards, setMyCards] = useState([]);
  const [marketCards, setMarketCards] = useState([]);
  const [myInfos, setMyInfos] = useState({
    currentAddress: "",
    currentNetwork: "",
  });

  useEffect(() => {
    const done = async () => {
      const { cards, web3 } = await loadEthereum();

      setMyInfos({
        currentAddress: web3.givenProvider.selectedAddress,
        currentNetwork: web3.givenProvider.networkVersion,
        web3,
      });
      setNft(cards);

      let contractAddress = cards._address;

      //loading items from chain
      const contractBalance = await cards.methods
        .balanceOf(contractAddress)
        .call();

      for (let i = 0; i < contractBalance; i++) {
        let item = await cards.methods
          .tokenOfOwnerByIndex(contractAddress, i)
          .call();
        let item2 = await cards.methods.tokenByIndex(item).call();
        let token = await cards.methods
          .marketCards(contractAddress, item2)
          .call();
        // console.log(token);

        setMarketCards((marketCards) => [...marketCards, token]);
      }

      let myAddress = web3.givenProvider.selectedAddress;
      console.log(`current address: ${myAddress}`);

      const accountBalance = await cards.methods.balanceOf(myAddress).call();

      for (let i = 0; i < accountBalance; i++) {
        let item = await cards.methods.tokenOfOwnerByIndex(myAddress, i).call();
        let item2 = await cards.methods.tokenByIndex(item).call();
        console.log(item2);
        let token = await cards.methods.marketCards(myAddress, item2).call();
        // console.log(token);

        console.log(item);

        setMyCards((myCards) => [...myCards, token]);
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
