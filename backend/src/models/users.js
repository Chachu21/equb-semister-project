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

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip hashing if password isn't modified
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// Middleware to update is_approved when bank_account is filled
userSchema.pre("save", function (next) {
  console.log("update is approved properties");
  if (this.isModified("bank_account") && !this.is_approved) {
    this.is_approved = true;
    console.log(this.is_approved);
  }
  next();
});

// Instance method to compare password during login
userSchema.methods.comparePassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

const User = mongoose.model("User", userSchema);

export default User;
