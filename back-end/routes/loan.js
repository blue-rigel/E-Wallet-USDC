const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { ProcessLoanApplication } = require("../services/loan");

router.get("/list", async function (req, res) {
  const prisma = new PrismaClient();
  const loans = await prisma.loan.findMany({});
  await prisma.$disconnect();
  res.send(loans);
});

router.post("/create", async function (req, res) {
  const prisma = new PrismaClient();
  const {
    name,
    email,
    gender,
    relationshipStatus,
    education,
    income,
    houseHoldIncome,
    amount,
    duration,
  } = req.body;

  const isLoanSuccessful = await ProcessLoanApplication(
    gender, relationshipStatus, education, income, parseFloat(amount), duration
  );

  await prisma.loan.create({
    data: {
      name,
      email,
      gender,
      relationshipStatus,
      education,
      income,
      houseHoldIncome,
      amount: parseFloat(amount).toFixed(2),
      duration,
      status: isLoanSuccessful ? "approved" : "rejected",
    },
  });

  await prisma.$disconnect();
  res.status(200).send({ message: "Loan processed successfully" });
});

module.exports = router;
