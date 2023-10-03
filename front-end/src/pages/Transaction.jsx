import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Web3 from "web3";
import { savePDF } from "@progress/kendo-react-pdf";
import PrintIcon from "@mui/icons-material/Print";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const tableRef = useRef(null);

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
        console.log("Address:", address);

        // Fetch transactions for the address
        const transactionPromises = [];
        const blockNumber = await web3.eth.getBlockNumber();
        for (let i = 0; i <= blockNumber; i++) {
          const transactionCount = await web3.eth.getBlockTransactionCount(i);
          for (let j = 0; j < transactionCount; j++) {
            const transaction = await web3.eth.getTransactionFromBlock(i, j);
            if (transaction.from.toLowerCase() === address.toLowerCase()) {
              const block = await web3.eth.getBlock(i);
              const transactionWithDate = {
                ...transaction,
                blockTimestamp: block.timestamp.toString(),
                to: transaction.to || "Contract Creation",
              };
              transactionPromises.push(transactionWithDate);
            }
          }
        }
        const transactionDetails = await Promise.all(transactionPromises);
        setTransactions(transactionDetails);
        console.log(transactionDetails);
      } catch (error) {
        console.error("Error connecting to blockchain:", error);
      }
    };

    connectToBlockchain();
  }, []);

  const convertWeiToEther = (wei) => {
    const ether = Web3.utils.fromWei(wei.toString(), "ether");
    return parseFloat(ether).toFixed(4);
  };

  const getFormattedDate = (timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  };

  const handlePrint = () => {
    savePDF(tableRef.current, {
      paperSize: "A4",
      fileName: "transactions.pdf",
      margin: 10,
      scale: 0.4,
    });
  };

  return (
    <div>
      <h3 style={{ color: "#06427d" }}>
        <b>ACCOUNT TRANSACTION DETAILS</b>
      </h3>
      <Grid
        item
        xs={5}
        sx={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          size="large"
          type="submit"
          onClick={handlePrint}
          sx={{ bgcolor: "#06427d" }}
          startIcon={<PrintIcon />}
        ></Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          ref={tableRef}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <b style={{ color: "#807c7c" }}>DATE </b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b style={{ color: "#807c7c" }}>FROM </b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b style={{ color: "#807c7c" }}>TO</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b style={{ color: "#807c7c" }}>AMOUNT (ETH)</b>
              </StyledTableCell>
              {/* <StyledTableCell align="right"><b>Gas Price (ETH)</b></StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {getFormattedDate(transaction.blockTimestamp)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {transaction.from}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {transaction.to}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {convertWeiToEther(transaction.value)}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{convertWeiToEther(transaction.gasPrice)}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transaction;
