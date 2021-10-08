const Cards = artifacts.require("Cards");

module.exports = async () => {
  try {
    const cards = await Cards.deployed();
    const [account, _] = await web3.eth.getAccounts();

    const value = web3.utils.toWei("0.1");
    const value2 = web3.utils.toWei("0.12");
    await cards.mintCards(value, "Luciano", "Description 1", "./card1.png");
    await cards.mintCards(value2, "Hernanes", "Description 2", "./card2.png");
    console.log("finished!");
  } catch (error) {
    console.log(error);
    console.log("ERRO!");
  }
};
