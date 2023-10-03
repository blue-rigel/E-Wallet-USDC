import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Paper,
  Alert,
  Stack,
} from "@mui/material";
import Web3 from "web3";
import contractArtifact from "../ethereum/Transaction.json";

// const CONTRACT_ADDRESS = contractArtifact.networks[5777].address;
const CONTRACT_ABI = contractArtifact.abi;

const Transfer = () => {
  const [toAccount, setToAccount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [amount, setAmount] = useState("");
  const date = new Date().toISOString().slice(0, 10);
  const [accounts, setAccounts] = useState([]);
  const [contractInstance, setContractInstance] = useState(null);
  const [pending, setPending] = useState(null);
  const [approved, setApproved] = useState(null);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleClose = () => {
    setOpenAlert(false);
    setPending(null);
    setAccounts([]);
    setAmount("");
  };
  const web3 = new Web3("http://localhost:7545");

  useEffect(() => {
    connectToNetwork();
  }, []);

  const connectToNetwork = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      setFromAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = contractArtifact.networks[networkId];
      const contract = new web3.eth.Contract(
        CONTRACT_ABI,
        deployedNetwork.address
      );
      setContractInstance(contract);

      console.log("Connected to Ethereum");
    } catch (error) {
      console.error("Error connecting to Ganache network:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (contractInstance) {
        const sender = fromAccount;
        const recipient = toAccount;
        const transactionAmount = web3.utils.toWei(amount, "ether");

        const transaction = contractInstance.methods
          .addTransaction(sender, recipient, transactionAmount)
          .send({
            from: sender,
            value: transactionAmount,
          });

        transaction
          .on("transactionHash", (hash) => {
            console.log("Transaction pending:", hash);
            setPending(hash);
          })
          .on("confirmation", (confirmationNumber, receipt) => {
            console.log("Transaction confirmed:", receipt.transactionHash);
            setApproved(receipt.transactionHash);
            console.log(approved);
            // Process the receipt and update the UI with relevant information
            // You can access receipt properties like receipt.status, receipt.blockNumber, etc.
          })
          .on("error", (error) => {
            console.error("Transaction error:", error);
          });
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendTransaction();
  };

  return (
    <Paper elevation={3} sx={{ padding: "1rem" }}>
      {pending == null && (
        <Box sx={{ width: "100%", padding: "1em" }}>
          <Typography
            sx={{ width: "100%", padding: "1em" }}
            variant="h6"
            gutterBottom
          >
            <b style={{ color: "#696969" }}>ONE TIME TRANSFER</b>
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <TextField
                  value={fromAccount}
                  disabled
                  fullWidth
                  variant="outlined"
                  label="From Account"
                  margin="normal"
                  size="small"
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  label="To Account"
                  margin="normal"
                  size="small"
                >
                  {accounts
                    .filter((account) => account !== fromAccount)
                    .map((account) => (
                      <MenuItem key={account} value={account}>
                        {account}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid item xs={7}>
                <TextField
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  label="Amount (ETH)"
                  type="number"
                  step="0.01"
                  inputProps={{ min: 0 }}
                  margin="normal"
                  size="small"
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  value={date}
                  disabled
                  fullWidth
                  variant="outlined"
                  label="When"
                  margin="normal"
                  size="small"
                />
              </Grid>
            </Grid>
          </form>
          <Box sx={{ marginTop: "1rem" }}>
            <Typography variant="caption" color="textSecondary">
              DISCLAIMER
              <br />
              By checking the box and clicking ‘Submit’, you agree that you
              would like to perform a One-Time Transfer without the need to (i)
              authorise transaction amounts lower than or equal to 1,000 SGD; or
              (ii) set a pre-authorised account for such transfers. For each
              One-Time Transfer performed, you will be notified by SMS or email.
              <br />
              Note:
              <br />
              One-Time Transfers allow you to perform ad-hoc transfers without
              having to add payees. If your daily accumulated ad-hoc transfer is
              more than 1,000 SGD, you will need to authorise it with
              transaction signing. FAST (Fast and Secure Transfers) is a service
              that allows you to transfer funds almost immediately to accounts
              from another bank. Please click here for FAST Credit Transfer
              Terms and Conditions. Funds transfers from a credit card is
              treated as Cash Advance and the following applies: The maximum
              Cash Advance you can take is 75% of your credit limit or available
              credit limit (whichever is lower). Interest is charged on a daily
              basis at 2% per month – from the date of each Cash Advance
              transaction until the date full payment is made. A Cash Advance
              fee of 8% of the transaction amount or 15 SGD (whichever is
              greater) applies for each Cash Advance transaction. It will be
              charged to your UOB credit card.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "1rem",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Transfer
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {pending && pending.length === 66 && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          {openAlert && (
            <Alert onClose={handleClose}>Your Transaction is Pending!</Alert>
          )}
        </Stack>
      )}
    </Paper>
  );
};

export default Transfer;
