import Web3 from "web3";
import Cards from "./contracts/Cards.json";

export const loadEthereum = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    const chainId = await window.ethereum.networkVersion;
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
  } else {
    alert("PLEASE INSTALL METAMASK");
  }
};

export default loadEthereum;
