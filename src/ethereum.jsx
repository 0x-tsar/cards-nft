import Web3 from "web3";
import Cards from "./contracts/Cards.json";

// export const loadEthereum = async () => {
//   window.addEventListener("load", async () => {
//     console.log("ethereum");
//     if (window.ethereum) {
//       const web3 = await new Web3(window.ethereum);
//       window.ethereum.enable();
//       let chainId = await window.ethereum.networkVersion;

//       if (chainId !== "5777") {
//         alert("change to 5777 network");
//       } else {
//         const cards = new web3.eth.Contract(
//           Cards.abi,
//           Cards.networks[chainId].address
//         );

//         console.log(cards);

//         window.ethereum.on("chainChanged", (change) => {
//           window.location.reload();
//         });

//         window.ethereum.on("accountsChanged", (change) => {
//           window.location.reload();
//         });

//         return { cards, web3 };
//       }
//     } else {
//       alert("PLEASE INSTALL METAMASK");
//     }
//   });
// };

// export default loadEthereum;

export const loadEthereum = async () =>
  new Promise(async (resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = await new Web3(window.ethereum);
        window.ethereum.enable();
        let chainId = await window.ethereum.networkVersion;

        console.log(`chainId: ${chainId}`);

        if (chainId !== "80001") {
          alert("change to 5777 || 42,69 or 80001 network ");
        } else {
          const cards = new web3.eth.Contract(
            Cards.abi,
            Cards.networks[chainId].address
          );

          window.ethereum.on("chainChanged", (change) => {
            console.log("change it");
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", (change) => {
            window.location.reload();
          });

          resolve({ cards, web3 });
        }
        resolve({ cards: undefined, web3: undefined });
      } else {
        alert("PLEASE INSTALL METAMASK");
      }
    });
  });

export default loadEthereum;
