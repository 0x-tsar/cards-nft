// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Cards is ERC721Enumerable {
    address public admin;
    uint256 public nextItemId;

    struct Card {
        uint256 id;
        address owner;
        uint256 price;
        string description;
        string urlPicture;
        uint256 timestamp;
    }

    mapping(address => Card) public marketCards;
    mapping(address => mapping(uint256 => Card)) public myCards;

    constructor() ERC721("Cards Futebol", "FUT") {
        admin = msg.sender;
    }

    function mintCards(
        uint256 _price,
        string memory _description,
        string memory _urlPicture
    ) external {

        Card memory card = Card({
            id: nextItemId,
            owner: address(this),
            price: _price,
            description: _description,
            urlPicture: _urlPicture,
            timestamp: block.timestamp
        });

        _mint(address(this), nextItemId);
        marketCards[address(this)] = card;

        //test
        myCards[msg.sender][nextItemId] = card;
            // mapping(address => mapping(uint256 => Card)) public myCards;


        // tokenOfOwnerByIndex(owner, index);
        // tokenByIndex(index);

        nextItemId++;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "";
    }
}
