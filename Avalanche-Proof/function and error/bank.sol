// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MysteryBox {
    address public owner;
    uint256 public totalBoxes;
    mapping(uint256 => string) public boxContents;
    mapping(uint256 => address) public boxOwners;

    string[] private items = [
        "Gold Coins",
        "Silver Sword",
        "Ancient Artifact",
        "Mystic Scroll",
        "Cursed Ring"
    ];

    event BoxBought(uint256 boxId, address buyer);
    event BoxOpened(uint256 boxId, string item, address opener);

    modifier onlyOwnerOfBox(uint256 boxId) {
        require(boxOwners[boxId] == msg.sender, "Caller is not the owner of the box");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Function to buy a mystery box
    function buyBox() public {
        totalBoxes++;
        uint256 boxId = totalBoxes;
        boxOwners[boxId] = msg.sender;
        boxContents[boxId] = "Unopened";

        emit BoxBought(boxId, msg.sender);
    }

    // Function to open a mystery box
    function openBox(uint256 boxId) public onlyOwnerOfBox(boxId) {
        require(keccak256(abi.encodePacked(boxContents[boxId])) == keccak256(abi.encodePacked("Unopened")), "Box already opened");

        string memory item = getRandomItem();
        boxContents[boxId] = item;

        emit BoxOpened(boxId, item, msg.sender);
    }

    // Private function to get a random item
    function getRandomItem() private view returns (string memory) {
        uint256 index = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, totalBoxes))) % items.length;
        return items[index];
    }
}