// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MindlessLinesMinimum is ERC721, Ownable {
    string private _uri = "https://example.com/";

    constructor() public ERC721("MLTest", "ML") {}

    function mint() public onlyOwner {
        for (uint i = 1; i <= 1000; i++) {
            _safeMint(msg.sender, i);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return _uri;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _uri = baseURI;
    }
}
