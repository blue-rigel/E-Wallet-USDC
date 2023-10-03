import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  Divider,
} from "@mui/material";
import axios from "axios";

const Loan = () => {
  const [loading] = useState(false);
  // const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Education: "",
    Credit_History: "",
    Dependents: "",
    Gender: "",
    Self_Employed: "",
    Married: "",
  });
  // const features ={
  //   'Gender': [1],
  //   'Married': [2],
  //   'Education': [1],
  //   'Self_Employed': [2],
  //   'ApplicantIncome': [19],
  //   'CoapplicantIncome': [0.0],
  //   'LoanAmount': [120.0],
  //   'Loan_Amount_Term': [360.0],
  //   'Credit_History': [1],
  //   'Property_Area': [3],
  //   'Dependents': [0]
  //  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getPrediction = async () => {
    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      console.log(res.data.prediction);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Paper elevation={3} sx={{ padding: "1rem", backgroundColor: "#eef6ff" }}>
      <FormControl component="fieldset">
        <Typography variant="h6" gutterBottom>
          <b style={{ color: "#06427d" }}>PERSONAL LOAN APPLICATION</b>
        </Typography>
        <div>
          <b style={{ color: "#a49f9f", fontSize: "14px" }}>
            TO TO ELIGIBEL FOR OPEN BANKING PERSONAL LOAN,YOU MUST BE:
          </b>
          <br />
          <b
            style={{ color: "#a49f9f", paddingLeft: "14px", fontSize: "14px" }}
          >
            {" "}
            • 21 - 65 YEARS OLD{" "}
          </b>
          <br />
          <b
            style={{ color: "#a49f9f", paddingLeft: "14px", fontSize: "14px" }}
          >
            {" "}
            • MINIMUM ANNUAL INCOME OF S$30,000
          </b>
        </div>
        <Divider
          sx={{ color: "#06427d", marginTop: "1rem", border: "1px solid" }}
        />
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}
        >
          <br />
          <p style={{ color: "#06427d" }}>
            <b>ENTER THE DETAILS TO PROCEED WITH THE APPLICATION</b>
            <br />
            <span style={{ textAlign: "center", fontSize: "10px" }}>
              <b>By using this Application you can process the loan</b>
            </span>
          </p>
          <Grid item xs={12}>
            <TextField
              label="FullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="filled"
              fullWidth
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="filled"
              fullWidth
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1" gutterBottom>
                Gender
              </Typography>
              <RadioGroup
                row
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth sx={{ width: "50%" }}>
              <InputLabel>Education</InputLabel>
              <Select
                label="Education"
                name="Education"
                value={formData.Education}
                onChange={handleChange}
              >
                <MenuItem value="1">Undergraduate</MenuItem>
                <MenuItem value="2">No Graduate</MenuItem>
                <MenuItem value="3">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1" gutterBottom>
                Married
              </Typography>
              <RadioGroup
                row
                name="Married"
                value={formData.Gender}
                onChange={handleChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="2" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Dependents"
              name="Dependents"
              type="number"
              value={formData.Dependents}
              onChange={handleChange}
              variant="filled"
              fullWidth
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Applicant Income"
              name="ApplicantIncome"
              value={formData.ApplicantIncome}
              onChange={handleChange}
              variant="filled"
              fullWidth
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Coapplicant Income"
              name="CoapplicantIncome"
              value={formData.CoapplicantIncome}
              onChange={handleChange}
              variant="filled"
              fullWidth
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Loan Amount"
              name="LoanAmount"
              value={formData.LoanAmount}
              onChange={handleChange}
              variant="filled"
              fullWidth
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Loan Amount Term"
              name="Loan_Amount_Term"
              value={formData.Loan_Amount_Term}
              onChange={handleChange}
              variant="filled"
              fullWidth
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth sx={{ width: "50%" }}>
              <InputLabel>Credit History</InputLabel>
              <Select
                label="Credit History"
                name="Credit_History"
                value={formData.Credit_History}
                onChange={handleChange}
              >
                <MenuItem value="1">Good</MenuItem>
                <MenuItem value="2">Bad</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1" gutterBottom>
                Self Employed
              </Typography>
              <RadioGroup
                row
                name="Self_Employed"
                value={formData.Self_Employed}
                onChange={handleChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="2" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={getPrediction}
            sx={{ bgcolor: "#06427d", marginLeft: "1rem", width: "20%" }}
          >
            {loading ? <CircularProgress size={24} /> : "APPLY LOAN"}
          </Button>
        </Box>
      </FormControl>

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!loading && prediction && (
        <>
          <Typography variant="body2" align="center" sx={{ marginTop: "2rem" }}>
            <h2>{prediction}</h2>
            <b>
              You are Eligible for the Loan, we are processing your application.
              We will get back to you soon.
            </b>
          </Typography>
        </>
      )}
    </Paper>
  );
};

export default Loan;
