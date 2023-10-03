const { postOptions } = require('../utils');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const ProcessLoanApplication = async (gender, relationshipStatus, education, income, amount, duration) => {
    const incomeAmount = incomeMapping(income)
    const creditHistory = amount > incomeAmount ? 0 : 1
    const payload = {
        "Gender": [gender + 1],
        "Married": [relationshipStatus + 1],
        "Education": [educationMapping(education)],
        "Self_Employed": [2],
        "ApplicantIncome": [incomeAmount],
        "CoapplicantIncome": [0.0],
        "LoanAmount": [amount],
        "Loan_Amount_Term": [durationMapping(duration)],
        "Credit_History": [creditHistory],
        "Property_Area": [1000],
        "Dependents": [0]
    }

    const response = await fetch(
        "https://dolphin-app-niurd.ondigitalocean.app/predict",
        {
            body: JSON.stringify(payload),
            ...postOptions
        },
    );

    if (response.ok) {
        const resp = await response.json();
        if (resp.prediction === "Approved") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const educationMapping = (education) => {
    switch (education) {
        case "No formal education":
            return 1
        case "Primary education":
            return 2
        case "Secondary education or high school":
            return 3
        case "Vocational qualification":
            return 4
        case "Bachelor's degree":
            return 5
        case "Master's degree":
            return 6
        case "Doctorate or higher":
            return 7
        default:
            return 1
    }
}

const incomeMapping = (income) => {
    switch (income) {
        case "below_poverty":
            return 12000
        case "low_income":
            return 25000
        case "moderate_income":
            return 50000
        case "high_income":
            return 100000
        default:
            return 12000
    }
}

const durationMapping = (duration) => {
    switch (duration) {
        case "12 months":
            return 12
        case "2 years":
            return 24
        case "5 years":
            return 60
        case "8 years":
            return 96
        case "16 years":
            return 192
        case "20 years":
            return 240
        default:
            return 365
    }
}

module.exports = {
    ProcessLoanApplication
}