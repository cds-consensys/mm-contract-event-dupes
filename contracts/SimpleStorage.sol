pragma solidity >=0.4.21 <0.6.0;

contract SimpleStorage {
    event SimpleSet(string _message);

    uint public storedData;

    function set(uint x) public {
        storedData = x;
        emit SimpleSet("SimpleStorage Data stored successfully!");
    }
}
