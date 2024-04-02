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
    required: true,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  equbGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EqubGroup",
    required: true,
  },
  paymentResponse: {
    // Payment verification response
    status: {
      type: String,
      enum: ["pending", "verified", "failed"],
      default: "pending",
    },
    data: {
      type: Object,
    },
    // You can add more fields here like transaction ID, timestamps, etc.
  },
  // You can add more fields as needed
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
