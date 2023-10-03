const express = require("express");
const {
  GetAllTransactions,
  CreateTransaction,
  EstimateTransactionFee,
  isAddressValid,
} = require("../services/payment");
const { formatTransactionList } = require("../utils");
const router = express.Router();

router.get("/list", async function (req, res) {
  if (!req.session.user) {
    res.status(401).send({
      error: "User not logged in",
    });
    return;
  }
  const user = req.session.user;
  const transactions = await GetAllTransactions(user.wallet);
  res.send(formatTransactionList(transactions, user.wallet));
});

router.get("/dashboard", async function (req, res) {
  if (!req.session.user) {
    res.status(401).send({
      error: "User not logged in",
    });
    return;
  }
  const user = req.session.user;
  const transactions = await GetAllTransactions(user.wallet);
  const transactionList = formatTransactionList(transactions, user.wallet);

  let income = 0;
  let expense = 0;

  transactionList.forEach((transaction) => {
    if (transaction.to === `My Account (${user.wallet})`) {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  });

  res.send({
    wallet: user.wallet,
    transaction: transactionList.length > 0 ? transactionList[0] : null,
    income,
    expense,
    balance: income - expense,
  });
});

router.post("/estimate-fee", async function (req, res) {
  if (!req.session.user) {
    res.status(401).send({
      error: "User not logged in",
    });
    return;
  }
  const { destinationAddress, amount } = req.body;
  const wallet = req.session.user.wallet;
  const transaction = await EstimateTransactionFee(
    wallet,
    destinationAddress,
    amount,
  );
  return res.send({
    fee: transaction.data.low.baseFee,
  });
});

router.post("/create", async function (req, res) {
  if (!req.session.user) {
    res.status(401).send({
      error: "User not logged in",
    });
    return;
  }
  const { destinationAddress, amount } = req.body;
  const addressValid = await isAddressValid(destinationAddress);
  if (!addressValid) {
    res.status(400).send({
      error: "Invalid destination address",
    });
    return;
  }
  const walletId = req.session.user.walletId;
  const transaction = await CreateTransaction(
    destinationAddress,
    amount,
    walletId,
  );

  if (transaction.error) {
    res.status(400).send({
      error: transaction.error,
    });
    return;
  }

  return res.send(transaction);
});

module.exports = router;
