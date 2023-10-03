import React, { useState, useEffect } from "react";
import axios from "axios";

const File = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getAddressData = async () => {
      const url = "https://api-testnet.bscscan.com/api";
      const apiKey = "YourBscScanApiKey"; // Replace with your BscScan API key

      try {
        // Get account balance
        const balanceResponse = await axios.get(url, {
          params: {
            module: "account",
            action: "balance",
            address: address,
            tag: "latest",
            apikey: apiKey,
          },
        });
        setBalance(balanceResponse.data.result);

        // Get transaction list
        const transactionsResponse = await axios.get(url, {
          params: {
            module: "account",
            action: "txlist",
            address: address,
            startblock: 0,
            endblock: 99999999,
            sort: "desc",
            apikey: apiKey,
          },
        });
        setTransactions(transactionsResponse.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    getAddressData();
  }, [address]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      <h1>Wallet Address Information</h1>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter Wallet Address"
      />
      <p>Balance: {balance}</p>
      <h2>Transaction History</h2>
      <ul>
        {/* {transactions.map((transaction) => (
          <li key={transaction.hash}>{transaction.hash}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default File;
