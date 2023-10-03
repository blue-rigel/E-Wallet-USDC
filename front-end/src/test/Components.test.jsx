import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Dashboard from "../pages/Dashboard";
import Transaction from "../pages/Transaction";
import Transfer from "../pages/Transfer";
import Loan from "../pages/Loan";

test("renders dashboard component", () => {
  const { getByText } = render(
    // Wrap Dashboard with MemoryRouter
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  const welcomeText = getByText("Welcome Back, RAJAKUMRAN Nishanthi");
  expect(welcomeText).toBeInTheDocument();
});

test("renders transaction component", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <Transaction />
    </MemoryRouter>
  );
  // Check if a specific transaction is rendered (you can customize this as needed)
  const transactionText = getByText("ACCOUNT TRANSACTION DETAILS");
  expect(transactionText).toBeInTheDocument();
});

test("renders transfer component with specific text", () => {
  const { getByText } = render(
    <MemoryRouter>
      <Transfer />
    </MemoryRouter>
  );

  const transferText = getByText("ONE TIME TRANSFER");
  expect(transferText).toBeInTheDocument();

  // You can also add additional tests for other text elements on the page as needed
});
test("renders loan component with specific text", () => {
  const { getByText } = render(
    <MemoryRouter>
      <Loan />
    </MemoryRouter>
  );

  const loanText = getByText("PERSONAL LOAN APPLICATION");
  expect(loanText).toBeInTheDocument();

  // You can also add additional tests for other text elements on the page as needed
});
