// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Cards is ERC721Enumerable {
    address public admin;
    uint256 public nextItemId;

    // event cardMinted();
    event cardTransaction(
        address exOwner,
        address newOwner,
        uint256 price,
        uint256 timestamp,
        string action
    );

    struct Card {
        uint256 id;
        string title;
        address owner;
        uint256 price;
        string description;
        string urlPicture;
        uint256 timestamp;
    }

    mapping(address => mapping(uint256 => Card)) public marketCards;
    mapping(address => mapping(uint256 => Card)) public myCards;
    mapping(address => bool) public admins;

    constructor() ERC721("Cards Futebol", "FUT") {
        admin = msg.sender;
    }

    function mintCards(
        uint256 _price,
        string memory _title,
        string memory _description,
        string memory _urlPicture
    ) external {
        Card memory card = Card({
            id: nextItemId,
            owner: address(this),
            title: _title,
            price: _price,
            description: _description,
            urlPicture: _urlPicture,
            timestamp: block.timestamp
        });

        _mint(address(this), nextItemId);
        marketCards[address(this)][nextItemId] = card;
        nextItemId++;
    }

    function buyCardFromMarket(uint256 _idCard)
        external
        payable
        returns (bool)
    {
        require(
            marketCards[address(this)][_idCard].price <= msg.value,
            "value is not enough"
        );

        Card memory card = marketCards[address(this)][_idCard];
        delete marketCards[address(this)][_idCard];
        myCards[msg.sender][_idCard] = card;

        transferFrom(address(this), msg.sender, _idCard);

        emit cardTransaction(
            address(this),
            msg.sender,
            card.price,
            block.timestamp,
            "Buy"
        );

        return true;
    }

    function addAdmin(address _newAdmin) external returns (bool) {
        require(msg.sender == admin, "YOU ARE NOT AN ADMIN!");

        admins[_newAdmin] = true;
        return true;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "";
    }
}
