import {
  acceptPayment,
  getAllPayments,
  getAllPaymentsByUserId,
} from "../controllers/paymentController.js";

import express from "express";
const paymentRouter = express.Router();

paymentRouter.post("/accept-payment", acceptPayment);
paymentRouter.get("/", getAllPayments);
paymentRouter.get("/:userId", getAllPaymentsByUserId);

export default paymentRouter;
