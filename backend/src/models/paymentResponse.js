import mongoose from "mongoose";

const paymentResponseSchema = new mongoose.Schema({
  txRef: {
    type: String,
    required: true,
  },
  response: {
    type: Object,
    required: true,
  },
  verifiedAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentResponse = mongoose.model(
  "PaymentResponse",
  paymentResponseSchema
);

export default PaymentResponse;
