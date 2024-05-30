pragma solidity ^0.8.0;

contract Token {
    // public variables
    string public name;
    string public nickname;
    uint public supply;

    // mapping variable
    mapping(address => uint) public balances;

    // constructor
    constructor() {
        name = "Litcoin";
        nickname = "LCX";
        supply = 0;
    }

    // mint function
    function mint(address _address, uint _value) public {
        supply += _value;
        balances[_address] += _value;
    }

    // burn function
    function burn(address _address, uint _value) public {
        require(balances[_address] >= _value, "Insufficient balance");
        supply -= _value;
        balances[_address] -= _value;
    }
}