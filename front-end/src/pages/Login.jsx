import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import axios from "axios";

const LoginPage = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [pcpCode, setPcpCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3001/login-details");
      if(response?.data) {
        const backendRegistrationNumber = response.data[0].registrationNumber;
        const backendPcpCode = response.data[0].verificationCode;
        localStorage.setItem('token', response.data.token); // Save the token to local storage
    
        if (
          registrationNumber === backendRegistrationNumber &&
          pcpCode === backendPcpCode
        ) {
          window.location.href = "/dashboard"; // Redirect to dashboard on successful login
        } else {
          setError("Cannot login. Invalid credentials."); // Show error message
        }
      }
    } catch (err) {
      // console.error("Error retrieving login details:", err);
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
      <Card sx={{ maxWidth: 380 }}>
        <CardContent>
          <p style={{ marginBottom: "1rem", textAlign: "center" }}>
            <b style={{ fontSize: "20px" }}>Welcome to Open Banking System</b>
            <br/>
            <span style={{ fontSize: "10px" }}>
              Integration, Security, Efficiency, Innovation, Collaboration.
            </span>
          </p>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <img
              src="/images/lock.png"
              alt="Logo"
              style={{ height: "30px", marginRight: "1rem" }}
            />
            <Typography variant="body">
              <b style={{ fontSize: "20px" }}>Secure Login</b>
            </Typography>
          </Box>
          <form>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10}>
                <TextField
                  label="Registration Number"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  sx={{ borderRadius: "10px" }}
                  size="small"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label="5 digit PCP code"
                  type="password"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  sx={{ borderRadius: "10px" }}
                  size="small"
                  value={pcpCode}
                  onChange={(e) => setPcpCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={10}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  fullWidth
                  sx={{ borderRadius: "12px" }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
            {error && (
              <Typography
                variant="body2"
                align="center"
                color="error"
                sx={{ marginTop: "1rem" }}
              >
                {error}
              </Typography>
            )}
            <Typography
              variant="body2"
              align="center"
              sx={{ marginTop: "2rem" }}
            >
              Don't have an account? <Link href="/registration">Register</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
