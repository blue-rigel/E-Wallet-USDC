const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, './MyContract.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'MyContract.sol': {
            content: contractSource,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
const contractABI = compiled.contracts['MyContract.sol']['MyContract'].abi;
const contractBytecode = compiled.contracts['MyContract.sol']['MyContract'].evm.bytecode.object;

module.exports = {
    contractABI,
    contractBytecode,
};
