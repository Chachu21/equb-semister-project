// scheduleAnnouncement.js

import cron from "node-cron";
import Notification from "../models/notification.js";
import Payment from "../models/payments.js";
import User from "../models/users.js";
import Group from "../models/groups.js";

async function announceUnpaidMembersBeforeWinnerSelection(group) {
  console.log(group);
  console.log("object announce");
  try {
    const overdueMembers = [];
    const today = new Date();

    const winnerSelectionDate = new Date(group.startDate);
    winnerSelectionDate.setDate(
      winnerSelectionDate.getDate() + group.roundDuration
    );
    console.log("winnerSelectionDate: ", winnerSelectionDate);
    // Calculate the payment interval and subtract it from the winner selection date
    const paymentIntervalInMillis = group.paymentInterval * 24 * 60 * 60 * 1000;
    const announcementDate = new Date(
      winnerSelectionDate.getTime() - paymentIntervalInMillis
    );
    const isSameDate = (dateA, dateB) =>
      dateA.toISOString() === dateB.toISOString();
    console.log("announcementDate: ", announcementDate);
    // Proceed with overdue check only if today is the announcement date
    if (isSameDate(today, announcementDate)) {
      console.log("inside if ");
      for (const member of group.members) {
        const userId = member;
        const userData = await User.findById(userId);
        console.log(userData);
        if (!userData) continue;

        // Find payments for this user and group with status "started"
        const payments = await Payment.find({
          userId,
          groupId: group._id,
          status: "started",
        });
        console.log(payments);
        // Check if member has any payments
        if (!payments.length) continue; // Skip members without payments

        const lastPayment = payments[payments.length - 1];
        const daysSinceLastPayment = Math.floor(
          (today - lastPayment.date) / (1000 * 60 * 60 * 24)
        );

        if (daysSinceLastPayment > group.paymentInterval) {
          overdueMembers.push(member); // Include user details
        }
      }

      if (overdueMembers.length > 0) {
        const message = `Group ${
          group.name
        } has overdue payments from: ${overdueMembers.join(
          ", "
        )} before winner selection!`;
        console.log(message);
        // Save notification to the database
        const notification = new Notification({
          message,
          groupId: group._id,
          userId: userData._id,
        });
        await notification.save();
      }
    }
  } catch (error) {
    console.log(
      "Error announcing unpaid members before winner selection:",
      error.message
    );
  }
}

const adminUpaideAnnouncement = async () => {
  try {
    const groups = await Group.find({ status: "started" });
    // console.log(groups);
    for (const group of groups) {
      const currentDateTime = new Date();
      const threeMinutesLater = new Date(
        currentDateTime.getTime() + 3 * 60 * 1000
      );

      // Ensure all components of the cron pattern are valid numbers
      const seconds = isNaN(threeMinutesLater.getSeconds())
        ? "*"
        : threeMinutesLater.getSeconds();
      const minutes = isNaN(threeMinutesLater.getMinutes())
        ? "*"
        : threeMinutesLater.getMinutes();
      const hours = isNaN(threeMinutesLater.getHours())
        ? "*"
        : threeMinutesLater.getHours();
      const dayOfMonth = isNaN(threeMinutesLater.getDate())
        ? "*"
        : threeMinutesLater.getDate();
      const month = isNaN(threeMinutesLater.getMonth() + 1)
        ? "*"
        : threeMinutesLater.getMonth() + 1;

      // Construct the cron pattern
      const cronPattern = `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} *`;
      console.log(cronPattern);
      // Schedule announcementOfUser function to run on the calculated announcement date
      cron.schedule(cronPattern, () =>
        announceUnpaidMembersBeforeWinnerSelection(group)
      );
    }
  } catch (error) {
    console.error("Error scheduling announcement:", error.message);
  }
};

export default adminUpaideAnnouncement;
