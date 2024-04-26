import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    equbType: {
      type: String,
      required: true,
    },
    equbTypeLength: {
      type: Number,
    },
    amount: {
      type: Number,
      required: true,
    },
    numMembers: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema);

export default Request;
