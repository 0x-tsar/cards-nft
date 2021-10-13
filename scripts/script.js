const Cards = artifacts.require("Cards");

module.exports = async () => {
  try {
    const cards = await Cards.deployed();
    const [account, _] = await web3.eth.getAccounts();
    console.log(account);

    const value = web3.utils.toWei("0.01");

    // await cards.mintCards(
    //   "Luciano",
    //   value,
    //   "Description One",
    //   "Sao Paulo",
    //   "./card1.png",
    //   5,
    //   {
    //     from: account,
    //     // value: value,
    //   }
    // );

    // await cards.mintCards(
    //   "Hernanes",
    //   value,
    //   "Description Two",
    //   "Sao Paulo",
    //   "./card2.png",
    //   3,
    //   {
    //     from: account,
    //     // value: value,
    //   }
    // );

    // await cards.mintCards(
    //   "Reinaldo",
    //   value,
    //   "Description Three",
    //   // "Sao Paulo",
    //   "./card3.png",
    //   2,
    //   {
    //     from: account,
    //     // value: value,
    //   }
    // );

    await cards.mintCards(
      "Messi vs Boateng",
      value,
      "Drible...",
      // "Barcelona",
      "./card4.png",
      2,
      {
        from: account,
        // value: value,
      }
    );

    console.log(`minted.`);
  } catch (error) {
    console.log(error);
  }
};
