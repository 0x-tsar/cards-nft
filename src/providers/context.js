import React, { createContext, useEffect, useState } from "react";
import loadEthereum from "../ethereum";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [nft, setNft] = useState(undefined);
  // const [myCards, setMyCards] = useState([]);
  const [marketCards, setMarketCards] = useState([]);
  const [myInfos, setMyInfos] = useState([]);

  useEffect(() => {
    const done = async () => {
      const { cards, web3 } = await loadEthereum();
      console.log(cards);
    };

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
