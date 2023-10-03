const { getOptions, postOptions, encryptEntityKey } = require("../utils");
const { v4 } = require("uuid");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const GetAllTransactions = async (wallet) => {
  const response = await fetch(
    `https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=0x0FA8781a83E46826621b3BC094Ea2A0212e71B23&address=${wallet}&sort=asc&apikey=${process.env.POLYGON_API_KEY}`,
    {
      ...getOptions,
    },
  );

  if (response.ok) {
    const resp = await response.json();
    return resp.result;
  }
};

const CreateTransaction = async (destinationAddress, amount, walletId) => {
  const response = await fetch(
    "https://api.circle.com/v1/w3s/developer/transactions/transfer",
    {
      ...postOptions,
      body: JSON.stringify({
        amounts: [amount.toString()],
        destinationAddress,
        tokenId: process.env.TOKEN_ID,
        idempotencyKey: v4(),
        walletId,
        entitySecretCiphertext: encryptEntityKey(),
        feeLevel: "LOW",
      }),
    },
  );

  if (response.ok) {
    return await response.json();
  } else {
    return {
      error: "Transaction Failed",
    };
  }
};

const EstimateTransactionFee = async (source, destination, amount) => {
  const response = await fetch(
    "https://api.circle.com/v1/w3s/transactions/transfer/estimateFee",
    {
      ...postOptions,
      body: JSON.stringify({
        amounts: [amount],
        destinationAddress: destination,
        tokenId: process.env.TOKEN_ID,
        sourceAddress: source,
      }),
    },
  );

  return await response.json();
};

const isAddressValid = async (address) => {
  const response = await fetch(
    "https://api.circle.com/v1/w3s/transactions/validateAddress",
    {
      ...postOptions,
      body: JSON.stringify({
        blockchain: 'MATIC-MUMBAI',
        address
      }),
    },
  );

  if (response.ok) {
    const resp = await response.json();
    if (resp.data.isValid) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = {
  GetAllTransactions,
  CreateTransaction,
  EstimateTransactionFee,
  isAddressValid,
};
