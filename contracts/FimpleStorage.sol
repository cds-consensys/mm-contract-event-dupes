pragma solidity >=0.4.21 <0.6.0;

contract FimpleStorage {
    event FimpleSet(string _message);
    event FimpleSet2(string _message);

    uint public storedData;

    function set(uint x) public {
        storedData = x;

        emit FimpleSet("Fimple Data stored successfully!");
        emit FimpleSet2("Fimple Data 2 stored successfully!");
    }
}
