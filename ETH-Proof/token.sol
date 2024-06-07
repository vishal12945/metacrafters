pragma solidity ^0.8.0;

contract Token {
    // public variables
    string public name;
    string public icon;
    uint public totalsupply;

    // mapping variable
    mapping(address => uint) public balances;

    // constructor
    constructor() {
        name = "Litcoin";
        icon = "LCX";
        totalsupply = 0;
    }

    // mint function
    function mint(address _address, uint _value) public {
        totalsupply += _value;
        balances[_address] += _value;
    }

    // burn function
    function burn(address _address, uint _value) public {
        require(balances[_address] >= _value, "Insufficient balance");
        totalsupply -= _value;
        balances[_address] -= _value;
    }
}