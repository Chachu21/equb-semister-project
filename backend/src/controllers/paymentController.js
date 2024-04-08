import Payment from "../models/payments.js";
import PaymentResponse from "../models/paymentResponse.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const CHAPA_AUTH_KEY =
  process.env.CHAPA_AUTH_KEY; //Put Your Chapa Secret Key

const acceptPayment = async (req, res) => {
  const { amount, currency, email, fname, lname, phone_number, tx_ref } =
    req.body;
  console.log(tx_ref);
  const CALLBACK_URL = "http://localhost:5000/api/v1/payment/verify-payment/";
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const TEXT_REF = {fname} + Date.now();

    const body = {
      amount: amount,
      currency: currency,
      email: email,
      first_name: fname,
      last_name: lname,
      phone_number: phone_number,
      tx_ref: TEXT_REF,
      return_url: "http://localhost:5173/",
      callback_url: CALLBACK_URL + TEXT_REF,
    };
    let resp = "";
    await axios
      .post("https://api.chapa.co/v1/transaction/initialize", body, header)
      .then((response) => {
        resp = response;
        console.log("something happen ", response);
      })
      .catch((error) => {
        console.log(error.response.data); // Prints the error response data
        console.log(error.response.status); // Prints the status code of the error response
        console.log(error.response.headers); // Prints the headers of the error response
        res.status(400).json({
          message: error,
        });
      });
    console.log("dsjhfkjasdkdfj", resp.data);
    res.status(200).json(resp.data);
  } catch (e) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
};

// verification endpoint
const verifyPayment = async (req, res) => {
  // req header with chapa secret key
  const config = {
    headers: {
      Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
    },
  };
  //verify the transaction
  try {
    const response = await axios.get(
      "https://api.chapa.co/v1/transaction/verify/" + req.params.id,
      config
    );
    console.log("Payment was successfully verified");
    console.log(response.data);

    // Save the payment response to the database
    const paymentResponse = new PaymentResponse({
      txRef: req.params.id,
      response: response.data,
    });
    await paymentResponse.save();

    res
      .status(200)
      .json({ message: "Payment verified and saved successfully" });
  } catch (error) {
    console.log("Payment can't be verified", error);
    res.status(500).json({ error: "Failed to verify payment" });
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

export { acceptPayment, verifyPayment, getAllPayments, getAllPaymentsByUserId };
