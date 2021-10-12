const Cards = artifacts.require("Cards");

module.exports = async () => {
  try {
    const cards = await Cards.deployed();
    const [account, _] = await web3.eth.getAccounts();
    console.log(account);

    const value = web3.utils.toWei("0.01");

    await cards.mintCards(value, "Description One", "./card1.png", {
      from: account,
      value: value,
    });

    console.log(`minted.`);
  } catch (error) {
    console.log(error);
  }
};
