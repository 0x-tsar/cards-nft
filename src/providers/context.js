import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
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
  const [teamTab, setTeamTab] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [clubCards, setClubCards] = useState([]);
  // const [currentTab, setCurrentTab] = useState("");

  let initialNfts = [
    {
      name: "",
      symbol: "",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [nfts, setNfts] = useState(initialNfts);

  const done = async () => {
    const { cards, web3 } = await loadEthereum();
    if (cards && web3) {
      getNfts(myInfos.account);

      async function getMetadataFromIpfs(tokenURI) {
        let metadata = await axios.get(tokenURI);
        return metadata.data;
      }

      async function getNfts() {
        let numberOfNfts = await cards.methods.totalSupply().call();

        console.log(numberOfNfts);
        let tempArray = [];
        let baseUrl = "";
        for (let i = 0; i < numberOfNfts; i++) {
          let tokenURI = await cards.methods.tokenURI(i).call();
          console.log(tokenURI);

          let metadata = await getMetadataFromIpfs(tokenURI);
          tempArray.push(metadata);
        }
        setNfts(tempArray);
        // console.log(tempArray);
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
        nfts: nfts,
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
      // console.log(balance);
      for (let i = 0; i < balance; i++) {
        const tokenId = await cards.methods
          .tokenOfOwnerByIndex(cards._address, i)
          .call();
        const token = await cards.methods.tokenByIndex(tokenId).call();
        const item = await cards.methods
          .marketCards(cards._address, token)
          .call();

        setMarketCards((marketCards) => [...marketCards, item]);
      }

      //events
      //events
      cards.events
        .cardMinted({})
        .on("data", async function (event) {
          // console.log(event.returnValues);
          // Do something here
          setMarketCards((marketCards) => [...marketCards, event.returnValues]);
        })
        .on("error", console.error);

      //
      cards.events
        .cardTransfered({})
        .on("data", async function (event) {
          // console.log(event.returnValues);
          // Do something here
          // changeVis("none");
          window.location.reload();
          // setMarketCards((marketCards) => [...marketCards, event.returnValues]);
        })
        .on("error", console.error);
    }
  };

  // useEffect(() => {
  //   done();
  // }, []);

  useEffect(() => {
    done();
  }, [refresh]);

  //

  const searchEachClub = async (team) => {
    if (myInfos.cards) {
      if (!team) return;
      const contract = await myInfos.cards.methods.clubToCreator(team).call();
      if (contract === "0x0000000000000000000000000000000000000000") {
        console.log("no creator found for this team for now");
        return;
      }
      console.log(team);

      console.log(contract);
    }
  };

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
        teamTab,
        setTeamTab,
        refresh,
        setRefresh,
        clubCards,
        setClubCards,
        searchEachClub,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
