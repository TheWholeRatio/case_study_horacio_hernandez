import dotenv from "dotenv";
import express, { Express, Request, Response, response } from "express";
import path from "path";
import cors from "cors";
import { validateCreditCard } from "./util/CreditCardValidator.js";
import { ValidateCreditCardResponse } from "./types/Network.js";

dotenv.config();

const app: Express = express();
const __dirname = path.resolve();

app.use(express.json());
const allowedOrigins = ["http://localhost:3000", "http://localhost:8000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.post("/validate_credit_card", (req, res) => {
  if (!req.body?.creditCardNumber) {
    const response: ValidateCreditCardResponse = {
      isValid: false,
      status: "status-critical",
      message: "Not a valid REquest",
    };
    return res.json(response);
  }

  const isValid = validateCreditCard(req.body.creditCardNumber);
  const message = isValid
    ? "Credit card is valid"
    : "Credit card number is invalid";
  const status = isValid ? "status-ok" : "status-critical";
  const response: ValidateCreditCardResponse = { isValid, message, status };
  return res.json(response);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
