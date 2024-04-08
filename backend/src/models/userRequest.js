import mongoose from "mongoose";

const EqubSchema = new mongoose.Schema(
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

const Request = mongoose.model("Request", EqubSchema);

export default Request;
