const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/auth.js", "./routes/payment.js"];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require("../index"); // Your project's root file
});
