import Payment from "../models/payments.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const CHAPA_AUTH_KEY =
  process.env.CHAPA_AUTH_KEY || "CHASECK_TEST-TzQrucAcnLoQiaxU5aTrO7klDliPULJn"; //Put Your Chapa Secret Key

const acceptPayment = async (req, res) => {
  const { amount, currency, email, fname, lname, phone_number, tx_ref } =
    req.body;
  console.log(tx_ref);
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      amount: amount,
      currency: currency,
      email: email,
      first_name: fname,
      last_name: lname,
      phone_number: phone_number,
      tx_ref: tx_ref,
      return_url: "http://localhost:5173/",
    };
    let resp = "";
    await axios
      .post("https://api.chapa.co/v1/transaction/initialize", body, header)
      .then((response) => {
        resp = response;
      })
      .catch((error) => {
        console.log(error.response.data); // Prints the error response data
        console.log(error.response.status); // Prints the status code of the error response
        console.log(error.response.headers); // Prints the headers of the error response
        res.status(400).json({
          message: error,
        });
      });
    res.status(200).json(resp.data);
  } catch (e) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user")
      .populate("equbGroup");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
};

// Get all payments for a specific user
const getAllPaymentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ user: userId })
      .populate("user")
      .populate("equbGroup");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve payments for the user" });
  }
};

export { acceptPayment, getAllPayments, getAllPaymentsByUserId };
