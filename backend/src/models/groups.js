import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import sendSMS from "../config/sendSMS.js"; // Assuming SMS sending function
import User from "./users.js";
import Payment from "./payments.js";

const contributionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
});

const roundSchema = new mongoose.Schema({
  round_no: {
    type: Number,
    required: true,
  },
  totalCollected: {
    type: Number,
    required: true,
    min: 0,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  winnerSelection_date: {
    type: Date,
  },
  distributedAmount: {
    type: Number,
  },
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  types: {
    type: String,
    required: true,
    trim: true,
  },
  roundDuration: {
    type: Number,
    // required: true,
    min: 0,
  },
  startDate: {
    type: Date,
    required: false, // Initially not required
  },
  member: {
    type: Number,
    required: true,
    min: 0,
  },
  round: {
    type: Number,
    required: true,
    default: 0,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  winners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  paymentInterval: {
    type: Number,
    // required: true,
  },
  contributions: [contributionSchema],
  rounds: [roundSchema],
});

// Mongoose validation (optional)
groupSchema.pre("save", function (next) {
  // Add custom validation logic here if needed
  console.log(
    "checking pre save of amount is whole number",
    Number.isInteger(this.amount)
  );
  if (!Number.isInteger(this.amount)) {
    throw new Error("Amount must be a whole number");
  }
  next();
});

groupSchema.pre("save", async function (next) {
  console.log("i am inside pre save of updatting start date and round by one");
  // Update start date for the next round after the first winner is selected

  if (
    this.rounds.length > 0 &&
    this.rounds[this.rounds.length - 1].winner === this.round <= this.member
  ) {
    // Calculate the start date for the next round based on the round duration
    const lastRoundWinnerSelectionDate =
      this.rounds[this.rounds.length - 1].winnerSelection_date;
    const nextRoundStartDate = new Date(lastRoundWinnerSelectionDate);
    nextRoundStartDate.setDate(
      nextRoundStartDate.getDate() + this.roundDuration
    );

    this.startDate = nextRoundStartDate;
    this.round = this.round + 1;
  }
  console.log("start date", this.startDate);
  console.log("round", this.round);
  next(); // Continue saving the group
});
// Pre-save hook to update status to "started" (if needed)
groupSchema.pre("save", function (next) {
  if (
    this.isModified("members") &&
    this.members.length === this.member &&
    this.status !== "started"
  ) {
    this.startDate = new Date();
    this.status = "started";
    this.round = 1;
  }
  next(); // Continue saving the group
});
groupSchema.pre("save", async function (next) {
  // Check if the status has changed to "started" and isCompleted is true
  if (
    this.isModified("status") &&
    this.status === "started" &&
    !this.isCompleted
  ) {
    // Execute startGroupIfNeeded method
    await this.startGroupIfNeeded();
  }
  next();
});

// Virtual property to check if the group is fully completed
groupSchema.virtual("isFullyCompleted").get(function () {
  console.log(
    "i am in side virtual for checking members size and member are equal"
  );
  return (
    this.members.length === this.member && this.winners.length === this.member
  );
});

// Mongoose post hook to update isCompleted property after saving
groupSchema.post("save", async function (doc) {
  console.log("for updatting of is completed properties");
  if (doc.isFullyCompleted) {
    doc.updateOne({ isCompleted: true }).exec(); // Update isCompleted to true
  }
});
groupSchema.methods.startGroupIfNeeded = async function () {
  console.log("inside startgroupifneeded function");

  if (this.status === "pending" && this.members.length === this.member) {
    this.status = "started";
    console.log("Group started:", this._id);

    const startedMessage = `Congratulations! The ${this.name} equb has started.`;

    // Retrieve phone numbers of all group members
    const memberPhonePromises = this.members.map(async (user_id) => {
      const user = await User.findById(user_id);
      return user ? user.phone : null;
    });

    // Await all promises to resolve
    const memberPhoneNumbers = await Promise.all(memberPhonePromises);

    // Filter out null values and send SMS to each member
    memberPhoneNumbers
      .filter((phone) => phone)
      .forEach((phoneNumber) => {
        sendSMS(phoneNumber, startedMessage)
          .then(() => console.log(`SMS sent to ${phoneNumber}`))
          .catch((error) => console.error(`SMS sending error: ${error}`));
      });

    // Do not call this.save() here
  }
};

// New method for winner selection (optional)
groupSchema.methods.selectWinner = async function () {
  console.log("i am in side select winner function");
  if (this.status === "started" && !this.rounds.find((round) => round.winner)) {
    // Filter members who haven't won yet
    const eligibleMembers = await Promise.all(
      this.members.map(async (memberId) => {
        const payments = await Payment.find({
          user: memberId,
          group: this._id,
          round: this.rounds.length,
        });
        // Check if all payments for the member are successful
        return (
          !this.winners.some((winnerId) => winnerId.equals(memberId)) &&
          payments.every((payment) => payment.status === "success")
        );
      })
    );

    // Filter out ineligible members
    const eligibleMemberIds = this.members.filter(
      (memberId, index) => eligibleMembers[index]
    );

    // Check if there are any eligible members
    if (eligibleMemberIds.length > 0) {
      // Implement logic for randomly selecting a winner from eligible members
      const winnerIndex = Math.floor(Math.random() * eligibleMemberIds.length);
      const winnerId = eligibleMemberIds[winnerIndex];

      // Update round information with winner and timestamp
      const currentRound = this.rounds[this.rounds.length - 1]; // Assuming latest round
      currentRound.winner = winnerId;
      currentRound.winnerSelection_date = Date.now();
      // await this.save(); // Update group schema with winner information

      // Retrieve winner details for notification
      const winner = await User.findById(winnerId);

      const winnerMessage = `Congratulations! You won the round for ${this.name} equb.`;

      // Send SMS notification to winner (handle potential errors)
      sendSMS(winner.phone, winnerMessage)
        .then(() => console.log(`SMS sent to winner ${winner.phone}`))
        .catch((error) => console.error(`SMS sending error: ${error}`));

      // Update winners array to include the newly selected winner
      this.winners.push(winnerId);
      // await this.save(); // Update winners array in group schema
    } else {
      console.log(
        "No eligible members found for winner selection in group:",
        this._id
      );
    }
  }
};
groupSchema.plugin(mongoosePaginate);

const Group = mongoose.model("Group", groupSchema);
export default Group;
