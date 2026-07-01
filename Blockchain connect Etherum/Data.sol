pragma solidity ^0.8.18;

contract Data {
    string public name;

    function Name(string memory _name) public {
        name = _name;
    }
}
