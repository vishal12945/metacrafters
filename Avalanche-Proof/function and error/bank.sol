// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    address public owner;
    uint256 public totalDeposits;

    event Deposit(address indexed sender, uint256 amount);
    event Withdrawal(address indexed receiver, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount should be greater than zero");

        totalDeposits += msg.value;

        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Only the owner can withdraw funds");

        require(amount <= address(this).balance, "Balance is not enough");

        assert(address(this).balance >= amount);

        (bool success,) = owner.call{value: amount}("");
        if (!success) {
            revert("Failed to withdraw funds");
        }
        totalDeposits -= amount;
        emit Withdrawal(owner, amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}