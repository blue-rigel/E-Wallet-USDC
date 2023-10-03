const { postOptions, encryptEntityKey } = require("../utils");
const { v4 } = require("uuid");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const CreateWallet = async () => {
  const response = await fetch(
    "https://api.circle.com/v1/w3s/developer/wallets",
    {
      ...postOptions,
      body: JSON.stringify({
        blockchains: ["MATIC-MUMBAI"],
        idempotencyKey: v4(),
        count: 1,
        entitySecretCiphertext: encryptEntityKey(),
        walletSetId: process.env.WALLETSET_ID,
      }),
    },
  );

  if (response.ok) {
    const resp = await response.json();
    return {
      wallet: resp.data.wallets[0].address,
      walletId: resp.data.wallets[0].id,
    };
  } else {
    return "Wallet Create failed";
  }
};

module.exports = { CreateWallet };
