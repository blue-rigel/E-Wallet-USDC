import React, { useState, useEffect } from "react";
import { Typography, Paper, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Credit from "../components/Credit";
import Web3 from "web3";
import contractArtifact from "../ethereum/USDTToken.json";
import axios from "axios";

const AccountSummary = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [etherBalance, setEtherBalance] = useState("");
  const [usdBalance, setUsdBalance] = useState("0");
  // const [usdBalance, setUsdBalance] = useState("0");
  // const [usdtBalance, setUsdtBalance] = useState(null);

  useEffect(() => {
    const connectToBlockchain = async () => {
      try {
        // Connect to MetaMask provider
        await window.ethereum.enable();

        // Create a Web3 instance using local provider
        const web3 = new Web3("http://localhost:7545");

        // Check if connected to the Ethereum network
        const isListening = await web3.eth.net.isListening();
        if (!isListening) {
          throw new Error("Unable to connect to the Ethereum network");
        }

        console.log("Connected to Ethereum network");

        // Get the current Ethereum address
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        // Get the Ether balance
        const balance = await web3.eth.getBalance(address);
        const etherAmount = web3.utils.fromWei(balance, "ether");

        // Fetch current Ethereum price in USD
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const ethereumPrice = response.data.ethereum.usd;

        // Calculate USD balance
        const usdAmount = parseFloat(etherAmount) * ethereumPrice;

        // Set the balances in state variables
        setAccountNumber(address);
        setEtherBalance(etherAmount);
        setUsdBalance(usdAmount);

        // ABI and contract address for your USDT contract
        // Replace with the actual ABI and contract address
        const usdtContractAbi = contractArtifact.abi;
        const usdtContractAddress = contractArtifact.networks["13"].address;

        // // Create a new contract instance with the USDT contract
        // const usdtContract = new web3.eth.Contract(usdtContractAbi, usdtContractAddress);

        // // Fetch the balance of USDT tokens for the current address
        // const usdtBalanceBigNumber = await usdtContract.methods.balanceOf(address).call();

        // // Convert BigNumber to a string and then to a regular number
        //  const usdtBalance = Number(usdtBalanceBigNumber.toString());

        // // USDT typically uses 6 decimal places, but confirm this with your specific USDT contract
        //   const usdtAmount = usdtBalance / Math.pow(10, 6);
        //   setUsdtBalance(usdtAmount)
        // Setup USDT contract
        const contract = new web3.eth.Contract(
          usdtContractAbi,
          usdtContractAddress
        );

        // Get balance
        const balanceWei = await contract.methods.balanceOf(accounts[0]).call();
        const balanceusdt = web3.utils.fromWei(balanceWei, "ether");
        console.log(balanceusdt);
      } catch (error) {
        console.error("Error connecting to blockchain:", error);
      }
    };

    connectToBlockchain();
  }, []);

  // Placeholder data

  const data = [{ name: "Jun", expenses: 5 }];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="subtitle1" sx={{ marginBottom: "2rem" }}>
          Welcome Back, <b>RAJAKUMARAN NISHANTHI</b>
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={5}>
            <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
              <b style={{ color: "#807c7c" }}>ACCOUNT NUMBER</b>
              <br />
              <p style={{ color: "#06427d", fontSize: "14px" }}>
                <b>{accountNumber}</b>
              </p>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
              <b style={{ color: "#807c7c" }}>YOUR AVAILABLE BALANCE</b>
              <br />
              <p style={{ fontSize: "14px" }}>
                Ethereum balance: {etherBalance} ETH
              </p>
              <p style={{ fontSize: "14px" }}>USD balance: ${usdBalance}</p>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7} justifyContent="center" alignItems="center">
            <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
              <b style={{ color: "#807c7c" }}> EXPENSES OVERVIEW</b>
            </Typography>
            <BarChart width={400} height={200} data={data}>
              <CartesianGrid strokeDasharray="7 7" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="expenses" fill="#06427d" />
            </BarChart>
          </Grid>
        </Grid>
      </Paper>
      <br />
      <Paper elevation={2} style={{ padding: "0.5em" }}>
        <Typography variant="body1">
          <b style={{ color: "#786e6e", padding: "1em" }}>
            Electronic Debit Card(1)
          </b>
        </Typography>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={5}>
            <Credit />
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <div>
              <Typography variant="h6" style={{ color: "#786e6e" }}>
                Open Bank Account
              </Typography>
              <Typography variant="body1">09876543212345</Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AccountSummary;
