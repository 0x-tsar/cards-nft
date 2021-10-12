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
      if (cards && web3) {
        // console.log(cards._address);

        // console.log(await cards.methods.admin().call());
        const balance = await cards.methods.balanceOf(cards._address).call();
        console.log(balance);
        for (let i = 0; i < balance; i++) {
          const tokenId = await cards.methods
            .tokenOfOwnerByIndex(cards._address, I)
            .call();
          const token = await cards.methods.tokenByIndex(tokenId).call();

          console.log(token);
        }
      }
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
