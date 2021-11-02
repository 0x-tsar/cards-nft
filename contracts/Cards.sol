// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Cards is ERC721Enumerable {
    address public immutable admin;
    uint256 public nextItemId;
    uint256 public CONTRACT_FEE = 1000; //10% fee
    uint256 public CREATORS_FEE = 2000; // 20% fee
    //185 basis points = 1.85 pct

    mapping(address => mapping(uint256 => Card)) public marketCards;
    mapping(address => mapping(uint256 => Card)) public myCards;
    /*for now just add one creator per club, but when I want to increase more creators
    for each club I just need to add mapping(string=>mapping(uint=>address)) 
    */

    //MIGRATE CONTRACT FIRST BEFORE ANYTHING, OF COURSE
    // first get the clubToCreator address of what team i want, then loop through marketCards
    // filtering just the cards `createdBy` that address and return it to the user

    mapping(string => string) private urlClubBadge;
    mapping(string => address) public clubToCreator;
    mapping(address => bool) public creators;

    constructor() ERC721("Cards Futebol", "FUT") {
        admin = msg.sender;
        creators[msg.sender] = true;
    }

    //type the club's the same you are authorized to post for
    function setClubBadge(string memory _club, string memory _newClubBadge)
        external
    {
        require(
            clubToCreator[_club] == msg.sender || admin == msg.sender,
            "YOUR ARE NOT A CREATOR OF THIS CLUB"
        );
        urlClubBadge[_club] = _newClubBadge;
    }

    function mintCards(
        string memory _title,
        uint256 _price,
        string memory _description,
        string memory _club,
        string memory _urlPicture,
        uint256 _totalAmount
    ) external {
        require(creators[msg.sender], "YOU ARE NOT A CREATOR");
        require(
            clubToCreator[_club] == msg.sender || admin == msg.sender,
            "YOU ARE NOT CREATOR OF THIS CLUB"
        );

        for (uint256 i = 0; i < _totalAmount; i++) {
            Card memory card = Card({
                title: _title,
                id: nextItemId,
                owner: address(this),
                price: _price,
                description: _description,
                urlPicture: _urlPicture,
                club: _club,
                timestamp: block.timestamp,
                createdBy: msg.sender,
                totalAmount: _totalAmount
            });

            _mint(address(this), nextItemId);
            marketCards[address(this)][nextItemId] = card;
            nextItemId++;

            emit cardMinted(
                card.title,
                card.id,
                card.owner,
                card.price,
                card.description,
                card.urlPicture,
                card.timestamp,
                card.totalAmount,
                card.createdBy
            );
        }

        // tokenOfOwnerByIndex(owner, index);
        // tokenByIndex(index);
    }

    //owner of the contract retrieving all of its fee's
    function retrieveFunds() external {
        require(msg.sender == admin, "YOU ARE NOT ALLOWED");
        payable(admin).transfer(address(this).balance);
    }

    // removing card creators, just admin allowed to remove
    function removeCreator(address _addr, string memory _club) external {
        require(admin == msg.sender, "YOU ARE NOT ADMIN");
        creators[_addr] = false;
        delete clubToCreator[_club];
    }

    function totalFundsCollected() external view returns (uint256) {
        return address(this).balance;
    }

    event cardMinted(
        string title,
        uint256 id,
        address owner,
        uint256 price,
        string description,
        string urlPicture,
        uint256 timestamp,
        uint256 totalAmount,
        address createdBy
    );

    event cardTransfered(
        uint256 id,
        address from,
        address to,
        uint256 timestamp
    );

    struct Card {
        string title;
        uint256 id;
        address owner;
        uint256 price;
        string description;
        string urlPicture;
        string club;
        uint256 timestamp;
        address createdBy;
        uint256 totalAmount;
    }

    function isCreator(address _addr) external view returns (bool) {
        return creators[_addr];
    }

    function isClubCreator(string memory _club) external view returns (bool) {
        require(
            clubToCreator[_club] == msg.sender || admin == msg.sender,
            "YOU ARE NOT CREATOR OF THIS CLUB NOR ADMIN"
        );

        return true;
    }

    // adding card creators, just admin allowed to add
    function addCreator(address _addr, string memory _club) external {
        require(admin == msg.sender, "YOU ARE NOT ADMIN");
        creators[_addr] = true;
        clubToCreator[_club] = _addr;
    }

    function buyCardFromMarket(uint256 tokenId) external payable {
        require(
            msg.value == marketCards[address(this)][tokenId].price,
            "NOT THE RIGHT AMOUNT OF ETH, MAY BE MORE OR LESS"
        );

        uint256 _fee_contract = calculateFeeAdmin(msg.value); //msg.value - FEE
        payable(marketCards[address(this)][tokenId].createdBy).transfer(
            msg.value - _fee_contract
        );

        _transfer(address(this), msg.sender, tokenId);
        myCards[msg.sender][tokenId] = marketCards[address(this)][tokenId];
        delete marketCards[address(this)][tokenId];

        emit cardTransfered(
            tokenId,
            address(this),
            msg.sender,
            block.timestamp
        );
    }

    //PUT MINT FN HERE
    //100 basis points = 1.00 pct
    function calculateFeeAdmin(uint256 amount) private view returns (uint256) {
        require((amount / 10000) * 10000 == amount, "too small");
        return (amount * CONTRACT_FEE) / 10000;
    }

    function calculateFeeCreator(uint256 amount)
        private
        view
        returns (uint256)
    {
        require((amount / 10000) * 10000 == amount, "too small");
        return (amount * CREATORS_FEE) / 10000;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "";
    }
}
