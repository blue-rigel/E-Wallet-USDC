import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";

const MetaMask = ({ setAccountNumber }) => {
  const [web3, setWeb3] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [accountCreated, setAccountCreated] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setWeb3(web3);
        } catch (error) {
          console.error("Error initializing MetaMask:", error);
        }
      } else {
        console.error("MetaMask not found");
      }
    };

    init();
  }, []);

  useEffect(() => {
    const handleNavigation = () => {
      if (web3 && !isPageLoaded && window.location.hostname === "localhost") {
        setIsPageLoaded(true);
        window.location.href = "/dashboard";
      }
    };

    if (isPageLoaded) {
      window.addEventListener("beforeunload", handleNavigation);
    } else {
      window.removeEventListener("beforeunload", handleNavigation);
    }

    return () => {
      window.removeEventListener("beforeunload", handleNavigation);
    };
  }, [web3, isPageLoaded]);

  const handleLogin = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          const accountNumber = accounts[0]; // Assuming you want to store the first account

          // Store the account number in your system (use your own logic here)
          // Example: API call or local storage
          console.log("Account Number:", accountNumber);
          console.log(accounts.length);
          setAccountNumber(accountNumber);
          setAccountCreated(accounts.length);
          console.log(accountCreated);

          // Update the state to trigger navigation
          setIsPageLoaded(true);

          // window.location.href = '/dashboard';
        } else {
          console.error("No accounts found in MetaMask");
        }
      } catch (error) {
        console.error("Error fetching account information:", error);
      }
    } else {
      console.error("MetaMask not initialized");
    }
  };

  if (!web3) {
    return (
      <div>
        <p>MetaMask not detected in your browser.</p>
        <p>If you already have MetaMask installed:</p>
        <p>1. Click on the MetaMask extension icon in your browser toolbar.</p>
        <p>2. A MetaMask popup should appear.</p>
        <p>
          3. Click on "Connect" or "Authorize" to grant the necessary
          permissions.
        </p>
        <p>If you don't have MetaMask installed:</p>
        <p>
          To use this feature, please install MetaMask by clicking{" "}
          <a
            href="https://metamask.io/download.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <p>
          If you are using the Edge browser, follow the instructions provided{" "}
          <a
            href="https://metamask.zendesk.com/hc/en-us/articles/360056396151-Getting-Started-on-Edge-Browser"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{" "}
          to install and use MetaMask.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ borderRadius: "10px" }}
        onClick={handleLogin}
      >
        Link with MetaMask
      </Button>
      {accountCreated < 0 && (
        <p>This step is mandatory for the registration.</p>
      )}
    </div>
  );
};

export default MetaMask;
