const Cards = artifacts.require("Cards");

module.exports = async () => {
  try {
    const cards = await Cards.deployed();
    // const [account, account2, account3, _] = await web3.eth.getAccounts();
    const [account] = await web3.eth.getAccounts();
    console.log(`account ${account}`);

    const value = web3.utils.toWei("0.001");

    // const accruedFeesContract = await cards.retrieveFunds({ from: account });
    // const totalFundsCollected = await cards.totalFundsCollected();
    // console.log(parseInt(totalFundsCollected));

    // const retrieveFunds = await cards.retrieveFunds();
    // console.log(retrieveFunds);

    // funds before retrieve 501524389676134521
    // funds before retrieve 541459907176134521

    //   function addCreator(address _addr, string memory _club) external {
    //     require(admin == msg.sender, "YOU ARE NOT ADMIN");
    //     creators[_addr] = true;
    //     clubToCreator[_club] = _addr;
    // }

    // function addCreator(address _addr, string memory _club)

    // 0x66F1901c243E33E87a6cdeb881c78505aBD9568f
    // adding creator
    // const addingCreator = await cards.addCreator(account, "sao-paulo");
    // console.log(addingCreator);
    //

    // const admin = await cards.admin.call();
    // console.log(admin);

    // console.log(`${account} account added to spfc`);

    // //checking if is creator
    // const isCreator = await cards.isCreator(account);
    // console.log(`${isCreator}`);

    // const isClubCreator = await cards.isClubCreator("spfc");
    // console.log(`${isClubCreator}`);

    // await cards.mintCards(
    //   "Luciano",
    //   value,
    //   "Description One",
    //   "spfc",
    //   "./card1.png",
    //   5,
    //   {
    //     from: account,
    //     // value: value,
    //   }
    // );

    // console.log(await cards.methods.tokenURI);

    //test pinata
    await cards.mintCards(
      "Luciano",
      value,
      "Description One",
      "spfc",
      "https://ipfs.io/ipfs/QmRZTmxsdUjSHJKqidiBn4hUT4Wf9dbndnKZmRsimB8sLX/luciano.json",
      1,
      {
        from: account,
        // value: value,
      }
    );

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

    // await cards.mintCards(
    //   "Messi vs Boateng",
    //   value,
    //   "Drible...",
    //   "Barcelona",
    //   "./card4.png",
    //   20,
    //   {
    //     from: account2,
    //     // value: value,
    //   }
    // );

    console.log(`minted.`);
  } catch (error) {
    console.log(error);
  }
};
