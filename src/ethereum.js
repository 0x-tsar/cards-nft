import Web3 from "web3";
import Cards from "./contracts/Cards.json";

export const loadEthereum = async () => {
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      const chainId = await window.ethereum.networkVersion;
      if (chainId !== "5777") {
        alert("change to 5777 network");
      } else {
        const cards = new web3.eth.Contract(
          Cards.abi,
          Cards.networks[chainId].address
        );

        window.ethereum.on("chainChanged", (change) => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", (change) => {
          window.location.reload();
        });

        return { cards, web3 };
      }
    } else {
      alert("PLEASE INSTALL METAMASK");
    }
  } catch (error) {
    console.log("ERROR");
  }
};

export default loadEthereum;
