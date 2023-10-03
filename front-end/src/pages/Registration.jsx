import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import DummyFace from "../components/Face";
import Signature from "../components/Signature";
import MetaMask from "../components/MetaMask";
import axios from "axios";
import DatePickerTextField from "../components/DatePicker";
import { getPerformance } from "firebase/performance";
import app from "../firebaseConfig";



// const performance = getPerformance();

const RegistrationPage = () => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [lastName, setLastName] = useState("");
  const [signature, setSignature] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [passcode, setPasscode] = useState("");
  const [accountNumber, setAccountNumber] = useState(0);
  const [signatureData, setsignatureData] = useState(false);

  const handleNext = () => {


    let isValid = true;

    if (activeStep === 0) {
      if (!lastName || lastName.length > 20) {
        setLastNameError(
          "Please enter a valid last name (maximum 20 characters)."
        );
        isValid = false;
      } else {
        setLastNameError("");
      }
      if (!dateOfBirth || new Date(dateOfBirth) >= new Date("2005-01-01")) {
        setDateOfBirthError(
          "Please enter a valid date of birth (before 2005)."
        );
        isValid = false;
      } else {
        setDateOfBirthError("");
      }
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const handleMetaMask = (e) => {
    e.preventDefault();
    handleNext();
  };

  const handleDigital = (e) => {
    e.preventDefault();
    handleNext();
  };

  useEffect(() => {
    const perf = getPerformance(app);
    console.log(perf)
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault();

    
    // trace.start(); // Start the trace when the button is clicked
    // // Your button click logic here
    // trace.stop(); // Stop the trace when the button click logic is done

    // Perform validation

    if (!lastName || lastName.length > 20) {
      setLastNameError(
        "Please enter a valid Last Name (maximum 20 characters)."
      );
      return;
    }
    if (!dateOfBirth || new Date(dateOfBirth) >= new Date("2005-01-01")) {
      setDateOfBirthError("Please enter a valid date of birth (before 2005).");
      return;
    }

    try {
      // Store in the database or perform other registration logic
      await axios.post("http://localhost:3001/registration", {
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        signature: signatureData,
        accountNumber: accountNumber,
      });
      setRegistrationSuccess(true);
      setLastName("");
      setDateOfBirth("");
      setSignature("");
      setAccountNumber("");

      // console.log("Registration successful!");
    } catch (err) {
      // console.error("Error storing registration details:", err);
    }

    // Store in the database or perform other registration logic
    // console.log("Last Name:", lastName);
    // console.log("Date of Birth:", dateOfBirth);
    // console.log("Signature:", signatureData);
    // console.log("accountNumber:", accountNumber);
    // Add your database storage logic here

    // Set registration success flag
    setRegistrationSuccess(true);

    // Reset form fields
    setLastName("");
    setDateOfBirth("");
    setSignature("");
    setAccountNumber("");
    // console.log(signature);
    // console.log("Registration successful!");
    //Get Login Details
    try {
      const response = await axios.get("http://localhost:3001/login-details");
      setRegistrationNumber(response.data[0].registrationNumber);
      setPasscode(response.data[0].verificationCode);
    } catch (err) {
      // console.error("Error retrieving login details:", err);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Last Name"
              variant="filled"
              margin="normal"
              style={{ width: "70%" }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={Boolean(lastNameError)}
              helperText={lastNameError}
              size="small"
            />
            <br />
            <DatePickerTextField />
            <TextField
              label="Date of Birth"
              type="date"
              variant="filled"
              margin="normal"
              style={{ width: "70%" }}
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              InputProps={{
                inputProps: {
                  max: "2004-12-31",
                },
              }}
              size="small"
              error={Boolean(dateOfBirthError)}
              helperText={dateOfBirthError}
            />

            <br />
            <Button
              variant="contained"
              onClick={handleNext}
              style={{ width: "70%" }}
              size="large"
              sx={{ marginTop: "2rem" }}
            >
              Next
            </Button>
          </form>
        );
      case 1:
        return (
          <div>
            <DummyFace />
            <Button
              variant="contained"
              onClick={handleNext}
              fullWidth
              size="large"
              sx={{ marginTop: "2rem" }}
            >
              Next
            </Button>
          </div>
        );
      case 2:
        return (
          <div>
            {accountNumber.length !== 42 && (
              <MetaMask setAccountNumber={setAccountNumber} />
            )}
            {accountNumber.length === 42 && (
              <div>
                <p style={{ color: "green", fontSize: "12px" }}>
                  Meta Mask Linking Successful!
                </p>
                <Button
                  variant="contained"
                  onClick={handleMetaMask}
                  fullWidth
                  size="large"
                  sx={{ marginTop: "2rem" }}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <form onSubmit={handleSubmit}>
            {!signatureData && (
              <Signature setsignatureData={setsignatureData} />
            )}
            <div>
              {signatureData && (
                <p style={{ color: "green", fontSize: "12px" }}>
                  Digital signature is Successfully collected!
                </p>
              )}
              {signatureData && (
                <Button
                  variant="contained"
                  onClick={handleDigital}
                  fullWidth
                  size="large"
                  sx={{ marginTop: "2rem" }}
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        );
      case 4:
        return (
          <form onSubmit={handleSubmit}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              sx={{ marginTop: "2rem" }}
              onClick={handleRegister}
            >
              Register
            </Button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        backgroundImage:
        "url(/images/openBanking.jpg)",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            {!registrationSuccess && (
              <Typography
                variant="h6"
                align="center"
                sx={{ marginBottom: "2rem" }}
              >
                <img
                  src="/images/logo.jpg"
                  alt="Logo"
                  style={{ height: "30px", marginRight: "16px" }}
                />
                <br />
                <b style={{ fontSize: "20px" }}>
                  {" "}
                  ENTER THE DETAILS TO CREATE YOUR ACCOUNT{" "}
                </b>
                <p style={{ fontSize: "10px" }}>
                  Start with OpenBanking to Secure Your Money
                </p>
              </Typography>
            )}
            {!registrationSuccess && (
              <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                  <StepLabel>
                    <b>Account Information</b>
                  </StepLabel>
                  <StepContent>{getStepContent(0)}</StepContent>
                </Step>
                <Step>
                  <StepLabel>
                    <b>Face Scanner</b>
                  </StepLabel>
                  <StepContent>{getStepContent(1)}</StepContent>
                </Step>
                <Step>
                  <StepLabel>
                    <b>MetaMask</b>
                  </StepLabel>
                  <StepContent>{getStepContent(2)}</StepContent>
                </Step>
                <Step>
                  <StepLabel>
                    <b>Digital Signature</b>
                  </StepLabel>
                  <StepContent>{getStepContent(3)}</StepContent>
                </Step>
                <Step>
                  <StepLabel>
                    <b>Complete Register</b>
                  </StepLabel>
                  <StepContent>{getStepContent(4)}</StepContent>
                </Step>
              </Stepper>
            )}
            {registrationSuccess ? (
              <div>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ marginTop: "2rem" }}
                >
                  Registration successful!
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ marginTop: "2rem" }}
                >
                  Your Registration Number is:{" "}
                  <p style={{ color: "blue" }}>
                    <b>{registrationNumber}</b>
                  </p>
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ marginTop: "1rem" }}
                >
                  Passcode:{" "}
                  <p style={{ color: "blue" }}>
                    <b>{passcode}</b>
                  </p>
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ marginTop: "1rem" }}
                >
                  Please <Link href="/">Login</Link> with your account.
                </Typography>
              </div>
            ) : activeStep === 3 ? (
              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: "2rem" }}
              >
                Already have an account? <Link href="/">Login</Link>
              </Typography>
            ) : null}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default RegistrationPage;
