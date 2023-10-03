import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("web3", () => ({
  Web3: {}
}))

test("renders login page by default", () => {
  render(<App />);
  const loginPageElement = screen.getByText("Secure Login");
  expect(loginPageElement).toBeInTheDocument();
});

