import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    phone: {
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
    },
    agreeTerms: {
      type: Boolean,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
