import React, { createContext, useEffect, useState, useContext } from "react";
import loadEthereum from "../ethereum";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  console.log("context");
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
      //loading items from chain
      const contractBalance = await cards.methods
        .balanceOf(cards._address)
        .call();
      console.log(parseInt(contractBalance));

      for (let i = 0; i < contractBalance; i++) {
        let item = await cards.methods
          .tokenOfOwnerByIndex(cards._address, i)
          .call();
        let item2 = await cards.methods.tokenByIndex(item).call();
        let token = await cards.methods
          .marketCards(cards._address, item2)
          .call();
        // console.log(token);

        setMarketCards((marketCards) => [...marketCards, token]);
      }
    };

    // let date = new Date(Number(item.date) * 1000);

    done();
  }, []);

  return (
    <AuthContext.Provider
      value={{ nft, setNft, marketCards, setMarketCards, myInfos, setMyInfos }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
