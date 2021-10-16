const Cards = artifacts.require("Cards");

module.exports = async () => {
  try {
    const cards = await Cards.deployed();
    const [account, account2, _] = await web3.eth.getAccounts();
    console.log(`account ${account}`);
    console.log(`account2 ${account2}`);

    const value = web3.utils.toWei("1");

    const accruedFeesContract = await cards.retrieveFunds({ from: account });
    const totalFundsCollected = await cards.totalFundsCollected();
    console.log(parseInt(totalFundsCollected));

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
    //   4,
    //   {
    //     from: account2,
    //     // value: value,
    //   }
    // );

    // await cards.mintCards(
    //   "Reinaldo",
    //   value,
    //   "Description Three",
    //   "Sao Paulo",
    //   "./card3.png",
    //   3,
    //   {
    //     from: account2,
    //     // value: value,
    //   }
    // );

    await cards.mintCards(
      "Messi vs Boateng",
      value,
      "Drible...",
      "Barcelona",
      "./card4.png",
      20,
      {
        from: account2,
        // value: value,
      }
    );

    console.log(`minted.`);
  } catch (error) {
    console.log(error);
  }
};
