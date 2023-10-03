const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require('cors')
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./doc/swagger_output.json");

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const loanRoutes = require("./routes/loan");
const audit = require("express-requests-logger");

const port = process.env.PORT || 3000;

var corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(audit())

app.set("trust proxy", 1);
app.use(
  session({
    secret: "open-banking-system",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: false,
      sameSite: "none"
    },
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none"
  }),
);

app.use("/auth", authRoutes);
app.use("/transaction", paymentRoutes);
app.use("/loan", loanRoutes);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => console.debug("Server is running"));
