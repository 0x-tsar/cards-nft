// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Cards is ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private nextItemId;

    address public immutable admin;
    // uint256 public nextItemId;
    uint256 public CONTRACT_FEE = 9500; //5% fee, the rest goes to the creator, 95% == 9500
    // uint256 public CREATORS_FEE = 2000; // 20% fee
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

    //waiting for admin approval
    // uint256 numPendingCreators = 0;
    mapping(address => string) public pendingCreator;

    // adding card creators, just admin allowed to add
    function addCreator(address _addr, string memory _club) external {
        require(admin == msg.sender, "YOU ARE NOT ADMIN");
        creators[_addr] = true;
        clubToCreator[_club] = _addr;
    }

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

            nextItemId.increment();
            _mint(address(this), nextItemId.current());
            marketCards[address(this)][nextItemId.current()] = card;
            _setTokenURI(nextItemId.current(), _urlPicture);

            //      _tokenIds.increment();

            // uint256 newItemId = _tokenIds.current();
            // _mint(owner(), newItemId);
            // _setTokenURI(newItemId, tokenURI);

            // _setTokenURI(nextItemId, _tokenURI);
            // _setTokenURI(nextItemId.current(), _urlPicture); //ipfs or pinata address

            emit cardMinted(
                card.id,
                card.owner,
                card.timestamp,
                card.title,
                card.price,
                card.description,
                card.urlPicture,
                card.totalAmount,
                card.createdBy
            );
        }

        // tokenOfOwnerByIndex(owner, index);
        // tokenByIndex(index);
    }

    // function mint(string memory tokenURI) public onlyOwner returns (uint256) {
    // _tokenIds.increment();

    // uint256 newItemId = _tokenIds.current();
    // _mint(owner(), newItemId);
    // _setTokenURI(newItemId, tokenURI);

    //     return newItemId;
    // }

    //owner of the contract retrieving all of its fee's
    function retrieveFunds() external onlyOwner {
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
        Counters.Counter indexed id,
        address indexed owner,
        uint256 indexed timestamp,
        string title,
        uint256 price,
        string description,
        string urlPicture,
        uint256 totalAmount,
        address createdBy
    );

    event cardTransfered(
        Counters.Counter indexed id,
        address indexed from,
        address to,
        uint256 indexed timestamp
    );

    struct Card {
        string title;
        Counters.Counter id;
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

    function buyCardFromMarket(uint256 tokenId) external payable {
        require(
            msg.value == marketCards[address(this)][tokenId].price,
            "NOT THE RIGHT AMOUNT OF ETH, IT CAN NOT BE MORE OR LESS"
        );

        uint256 _fee_contract = calculateFeeAdmin(msg.value); //msg.value - FEE
        payable(marketCards[address(this)][tokenId].createdBy).transfer(
            msg.value - _fee_contract
        );

        _transfer(address(this), msg.sender, tokenId);
        myCards[msg.sender][tokenId] = marketCards[address(this)][tokenId];
        delete marketCards[address(this)][tokenId];

        emit cardTransfered(
            Counters.Counter(tokenId),
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

    //overriding files
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
        // return "https://foo.com/token/";
        // return "https://ipfs.io/ipfs/";
    }

    // function calculateFeeCreator(uint256 amount)
    //     private
    //     view
    //     returns (uint256)
    // {
    //     require((amount / 10000) * 10000 == amount, "too small");
    //     return (amount * CREATORS_FEE) / 10000;
    // }

    // function _baseURI() internal view virtual override returns (string memory) {
    //     return "";
    // }
}
