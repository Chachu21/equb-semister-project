import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
    },

    phone_number: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    bank_account_no: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    imageUrl: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;