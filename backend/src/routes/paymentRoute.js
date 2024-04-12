import {
  acceptPayment,
  getAllPayments,
  getAllPaymentsByUserId,
  verifyPayment,
} from "../controllers/paymentController.js";
import { verifyToken } from "../midleware/jwtMiddleware.js";

import express from "express";
const paymentRouter = express.Router();

paymentRouter.post("/accept-payment", verifyToken, acceptPayment);
paymentRouter.get("/verify-payment/:id/:userId/:groupId/:round", verifyPayment);
paymentRouter.get("/", getAllPayments);
paymentRouter.get("/get/:userId", getAllPaymentsByUserId);

export default paymentRouter;
