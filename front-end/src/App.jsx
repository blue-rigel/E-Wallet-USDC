import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import AccountSummary from "./pages/AccountSummary";
import Transaction from "./pages/Transaction";
import Transfer from "./pages/Transfer";
import Loan from "./pages/Loan";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <AccountSummary />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
      {
        path: "transfer",
        element: <Transfer />,
      },
      {
        path: "loan",
        element: <Loan />,
      },
    ],
  },
]);

function App() {

  return <RouterProvider router={router} />
  ;
}

export default App;
