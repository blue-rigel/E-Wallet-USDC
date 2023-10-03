-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dob" DATE NOT NULL,
    "signature" TEXT NOT NULL,
    "regCode" TEXT NOT NULL,
    "pcpId" INTEGER NOT NULL,
    "wallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "gender" INTEGER NOT NULL,
    "relationshipStatus" INTEGER NOT NULL,
    "education" TEXT NOT NULL,
    "income" TEXT NOT NULL,
    "houseHoldIncome" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);
