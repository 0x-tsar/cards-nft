const Cards = artifacts.require("Cards");

module.exports = async (deployer) => {
  await deployer.deploy(Cards);
  console.log("Contract deployed");
};
