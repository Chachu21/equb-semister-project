import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    city: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      select: false,
    },
    bank_account: {
      bank_name: { type: String },
      account_holder_name: { type: String },
      account_no: { type: String },
    },
    email: {
      type: String,
      unique: true,
    },
    imageUrl: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    ID: {
      front: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      back: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
    is_approved: {
      type: String,
      default: false,
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
