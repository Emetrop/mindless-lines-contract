// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MindlessLines is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    uint public constant MAX_TOKENS = 999;
    uint public constant MAX_TOKENS_PER_PURCHASE = 20;

    Counters.Counter private _tokenIds;
    bool private _isSaleActive = true;
    string private _uri = "";
    uint private _basePrice = 25000000000000000; // 0.025 ETH

    constructor(string memory uri) public ERC721("MindlessLines", "ML") {
        _uri = uri;
    }

    function mint(uint count) public payable {
        uint totalSupply = _tokenIds.current();

        require(_isSaleActive, "Sale is not active" );
        require(count > 0 && count <= MAX_TOKENS_PER_PURCHASE, "Maximum tokens in a mint exceeded");
        require(totalSupply + count <= MAX_TOKENS, "Not enough tokens available to mint");
        require(msg.value >= _basePrice * count, "ETH value is not correct");

        for (uint i = 0; i < count; i++) {
            _tokenIds.increment();
            _safeMint(msg.sender, _tokenIds.current());
        }
    }

    function reserve(address to, uint count) public onlyOwner {
        uint totalSupply = _tokenIds.current();

        require(totalSupply + count <= MAX_TOKENS, "Not enough tokens available to mint");

        for (uint i = 0; i < count; i++) {
            _tokenIds.increment();
            _safeMint(to, _tokenIds.current());
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return _uri;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _uri = baseURI;
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function toggleSaleStatus() public onlyOwner {
        _isSaleActive = !_isSaleActive;
    }

    function getIsSaleActive() public view returns (bool) {
        return _isSaleActive;
    }

    function getPrice() public view returns (uint) {
        return _basePrice;
    }

    function setPrice(uint basePrice) public onlyOwner {
        _basePrice = basePrice;
    }
}
