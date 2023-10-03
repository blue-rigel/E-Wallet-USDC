const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { v4 } = require("uuid");
const { CreateWallet } = require("../services/wallet");

router.post("/login", async function (req, res) {
  const { code, pcp } = req.body;
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: {
      regCode: code,
      pcpId: pcp,
    },
  });
  await prisma.$disconnect();

  if (user) {
    session = req.session;
    session.sessionId = v4();
    session.user = user;
    res.send({
      data: {
        code: user.regCode,
        id: user.pcpId,
        wallet: user.wallet,
      },
    });
  } else {
    res.status(401).send({
      error: "Invalid login credentials",
    });
  }
});

router.get("/session", async function (req, res) {
  res.send({
    data: req.session
  });
});

router.post("/logout", async function (req, res) {
  await req.session.destroy();
  res.end();
});

router.post("/register", async (req, res) => {
  const { name, dob, signature } = req.body;
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      name,
      dob,
      signature,
      wallet: "",
      regCode: v4(),
      pcpId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    },
    select: {
      regCode: true,
      pcpId: true,
    },
  });

  const { wallet, walletId } = await CreateWallet();

  const updatedUser = await prisma.user.update({
    where: {
      regCode: user.regCode,
    },
    data: {
      wallet,
      walletId,
    },
    select: {
      regCode: true,
      pcpId: true,
      wallet: true,
    },
  });

  await prisma.$disconnect();

  res.send({
    data: updatedUser,
  });
});

module.exports = router;
