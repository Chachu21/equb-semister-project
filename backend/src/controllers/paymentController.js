import Payment from "../models/payments.js";
import PaymentResponse from "../models/paymentResponse.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Define a function to retry requests with exponential backoff
async function retryRequest(requestPromise, retryCount = 0) {
  const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff delay
  return requestPromise.catch((error) => {
    if (error.code === "EAI_AGAIN" && retryCount < 3) {
      console.log(
        `DNS lookup failed for ${error.config.url}. Retrying attempt ${
          retryCount + 1
        } after ${delay}ms`
      );
      return new Promise((resolve) =>
        setTimeout(
          () => resolve(retryRequest(requestPromise, retryCount + 1)),
          delay
        )
      );
    } else {
      throw error;
    }
  });
}
const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY; //Put Your Chapa Secret Key

const acceptPayment = async (req, res) => {
  const userId = req.user;
  console.log("user id", userId);
  const {
    amount,
    currency,
    email,
    first_name,
    last_name,
    phone_number,
    group_id,
    round,
  } = req.body;
  console.log("request body", req.body);

  const TEXT_REF = `${first_name}${Date.now()}`;
  console.log("text reference", TEXT_REF);
  const CALLBACK_URL = `http://localhost:5000/api/v1/payment/verify-payment/${TEXT_REF}/${userId}/${group_id}/${round}`;
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
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      tx_ref: TEXT_REF,
      return_url: "http://localhost:5173/userDashboard",
      callback_url: CALLBACK_URL,
    };
    let resp = "";
    await retryRequest(
      axios.post("https://api.chapa.co/v1/transaction/initialize", body, header)
    )
      .then((response) => {
        resp = response;
        // console.log("something happen ", response);
      })
      .catch((error) => {
        console.log("error is :::", error);
        console.log("respons data", error.response.data); // Prints the error response data
        console.log("respons status", error.response.status); // Prints the status code of the error response
        console.log("respons header", error.response.headers); // Prints the headers of the error response
        res.status(400).json({
          message: error,
          text: "error from catch with 400",
        });
      });
    // console.log("dsjhfkjasdkdfj", resp.data);
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
  console.log("am inside verify payment");
  const tx_ref = req.params.id;
  const group_id = req.params.groupId;
  const user_id = req.params.userId;
  const round = req.params.round;
  // console.log("params", req.params);
  // req header with chapa secret key
  const config = {
    headers: {
      Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
    },
  };
  //verify the transaction
  try {
    const responseFromChapa = await retryRequest(
      axios.get(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, config)
    );
    // console.log(responseFromChapa);
    console.log("something is happen");
    // Extract necessary data from the Chapa response
    const chapaData = responseFromChapa.data.data;
    console.log("chapa verify data", chapaData);
    // Construct payment object with required fields
    const payment = new Payment({
      tx_ref: chapaData.tx_ref,
      email: chapaData.email,
      phone_number: chapaData.phone_number,
      fname: chapaData.first_name,
      lname: chapaData.last_name,
      amount: chapaData.amount,
      currency: chapaData.currency,
      reference: chapaData.reference,
      status: chapaData.status,
      verified_at: new Date(), // Add verified_at field with current date/time
      user: user_id,
      equbGroup: group_id,
      round: round,
    });

    // Save the transaction
    const savedPayment = await payment.save();
    // console.log("saved transaction", savedPayment);
    res.json(savedPayment);
  } catch (error) {
    console.log("error from catch", error);
    res.status(500).json({ error: "Failed to verify and save payment" });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
};

// Get all payments for a specific user
const getAllPaymentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ user: userId });
    // .populate("user")
    // .populate("equbGroup");
    res.json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve payments for the user" });
  }
};

export { acceptPayment, verifyPayment, getAllPayments, getAllPaymentsByUserId };
