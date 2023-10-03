// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // Declare state variables
    uint256 public myVariable;

    // Declare an event
    event ValueChanged(uint256 newValue);

    // Constructor
    constructor() {
        myVariable = 0;
    }

    // Function to update the value
    function updateValue(uint256 newValue) public {
        myVariable = newValue;
        emit ValueChanged(newValue);
    }

    // Function to retrieve the current value
    function getValue() public view returns (uint256) {
        return myVariable;
    }
    mapping(uint256 => string) private data;

    event DataStored(uint256 indexed id, string value);

    function storeData(uint256 id, string calldata value) external {
        data[id] = value;
        emit DataStored(id, value);
    }

    function getData(uint256 id) external view returns (string memory) {
        return data[id];
    }
}
