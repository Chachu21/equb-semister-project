import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  tx_ref: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  round: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verified_at: {
    type: Date,
    required: true,
  },
  equbGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },

  // You can add more fields as needed
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
