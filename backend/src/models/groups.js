import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import sendSMS from "../config/sendSMS.js"; // Assuming SMS sending function
import User from "./users.js";
import Payment from "./payments.js";

const roundSchema = new mongoose.Schema({
  round_no: {
    type: Number,
    required: true,
  },

  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  winnerSelection_date: {
    type: Date,
  },
  receivedPayment: {
    type: Boolean,
    default: false, // Set default value to false
  },
  guarantee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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
    default: Date(),
  },
  paymentInterval: {
    type: Number,
    // required: true,
  },
  rounds: [roundSchema],
});

// Mongoose validation (optional)
groupSchema.pre("save", function (next) {
  if (!Number.isInteger(this.amount)) {
    throw new Error("Amount must be a whole number");
  }
  next();
});

// groupSchema.pre("save", async function (next) {
//   console.log("i am inside pre save for updating start date");
//   if (
//     this.rounds.length > 0 &&
//     this.rounds[this.rounds.length - 1].winner !== null &&
//     this.round <= this.member
//   ) {
//     // Calculate the start date for the next round based on the round duration
//     const lastRoundWinnerSelectionDate =
//       this.rounds[this.rounds.length - 1].winnerSelection_date;
//     const nextRoundStartDate = new Date(lastRoundWinnerSelectionDate);
//     nextRoundStartDate.setDate(
//       nextRoundStartDate.getDate() + this.roundDuration
//     );

//     this.startDate = nextRoundStartDate;
//     this.round = this.round + 1;
//   }
//   next(); // Continue saving the group
// });
// Pre-save hook to update status to "started" (if needed)
groupSchema.pre("save", async function (next) {
  const currentDate = new Date();
  if (
    this.isModified("members") &&
    this.members.length === this.member &&
    this.status !== "started"
  ) {
    this.startDate = currentDate;
    this.status = "started";
    this.round = 1;
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
  }
  next(); // Continue saving the group
});

// Virtual property to check if the group is fully completed
groupSchema.virtual("isFullyCompleted").get(function () {
  return (
    this.members.length === this.member && this.winners.length === this.member
  );
});

// Mongoose post hook to update isCompleted property after saving
groupSchema.post("save", async function (doc) {
  if (doc.isFullyCompleted) {
    doc.updateOne({ isCompleted: true }).exec(); // Update isCompleted to true
    doc.updateOne({ status: "completed" }).exec(); // Update isCompleted
  }
});

// New method for winner selection (optional)
groupSchema.methods.selectWinner = async function () {
  console.log("I am inside selectWinner function");
  if (
    this.status === "started" &&
    this.members.length !== this.winners.length
  ) {
    // Retrieve previous winners
    const previousWinners = this.winners;
    console.log("previous winners", previousWinners);
    // Filter members who haven't paid successfully
    const allMembersPaid = await Promise.all(
      this.members.map(async (memberId) => {
        console.log(memberId, this._id, this.round);
        // Check if all payments for the member are successful
        const payments = await Payment.find({
          user: memberId,
          equbGroup: this._id,
          round: this.round,
        });
        console.log("payment successful", payments);

        // Ensure payments is an array before using every()
        if (Array.isArray(payments) && payments.length > 0) {
          return payments.every((payment) => payment.status === "success");
        } else {
          return false; // No successful payments found for this member
        }
      })
    );

    console.log("all paid members", allMembersPaid);
    // If any member hasn't paid successfully, exit
    if (!allMembersPaid.every((paid) => paid)) {
      console.log("Not all members have paid successfully.");
      return;
    }

    // Filter out ineligible members
    const eligibleMemberIds = this.members.filter(
      (memberId) => !previousWinners.includes(memberId)
    );
    console.log("eligible members id: " + eligibleMemberIds);

    // Check if there are any eligible members
    if (eligibleMemberIds.length > 0) {
      console.log("eligible members length", eligibleMemberIds.length);
      // Implement logic for randomly selecting a winner from eligible members
      const winnerIndex = Math.floor(Math.random() * eligibleMemberIds.length);
      const winnerId = eligibleMemberIds[winnerIndex];
      // Add the winner to the winners array
      this.winners.push(winnerId);

      // Retrieve winner details for notification
      const winner = await User.findById(winnerId);
      // Push winner's details to rounds array
      this.rounds.push({
        round_no: this.round, // Assuming round_no is the field representing the round number
        winner: winnerId,
        winnerSelection_date: Date.now(),
      });
      const winnerMessage = `Congratulations! You won the round ${this.round} for ${this.name} equb.`;
      console.log(`hi winner ${winner.name}`, winnerMessage);
      // Send SMS notification to winner (handle potential errors)
      // sendSMS(winner.phone, winnerMessage)
      //   .then(() => console.log(`SMS sent to winner ${winner.phone}`))
      //   .catch((error) => console.log(`SMS sending error: ${error}`));
      if (this.round <= this.members.length) {
        // Increment round and update start date
        this.startDate = new Date();
        this.round += 1;
      }
      // Save the changes to the document
      await this.save();
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
