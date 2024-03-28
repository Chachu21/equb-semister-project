import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensure positive amount
  },
  types: {
    type: String,
    required: true,
    trim: true,
  },
  member: {
    type: Number,
    required: true,
    min: 0, // Ensure positive amount
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "started", "completed"], // Use enum for valid values
    default: "pending",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now, // Use default for automatic creation
  },
});

// Mongoose validation (optional)
groupSchema.pre("save", function (next) {
  // Add custom validation logic here if needed
  // Example: Ensure group amount is a whole number
  if (!Number.isInteger(this.amount)) {
    throw new Error("Amount must be a whole number");
  }
  next(); // Continue with saving the document
});

groupSchema.plugin(mongoosePaginate);

const Group = mongoose.model("Group", groupSchema);
export default Group;
