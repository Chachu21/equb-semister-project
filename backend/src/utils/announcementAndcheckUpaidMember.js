// scheduleAnnouncement.js

import cron from "node-cron";
import Notification from "../models/notification.js";
import Payment from "../models/payments.js";
import User from "../models/users.js";
import Group from "../models/groups.js";

async function announceUnpaidMembersBeforeWinnerSelection(group) {
  try {
    const overdueMembers = [];
    const today = new Date();

    const winnerSelectionDate = new Date(group.startDate);
    winnerSelectionDate.setDate(
      winnerSelectionDate.getDate() + group.roundDuration
    );

    // Calculate the payment interval and subtract it from the winner selection date
    const paymentIntervalInMillis = group.paymentInterval * 24 * 60 * 60 * 1000;
    const announcementDate = new Date(
      winnerSelectionDate.getTime() - paymentIntervalInMillis
    );

    // Proceed with overdue check only if today is the announcement date
    if (today.toDateString() === announcementDate.toDateString()) {
      for (const member of group.members) {
        const userId = member;
        const userData = await User.findById(userId);
        if (!userData) continue;

        // Find payments for this user and group with status "started"
        const payments = await Payment.find({
          userId,
          groupId: group._id,
          status: "started",
        });

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
    console.error(
      "Error announcing unpaid members before winner selection:",
      error.message
    );
  }
}

const adminUpaideAnnouncement = async () => {
  try {
    // Find all groups that are started
    const groups = await Group.find({ status: "started" });
    // Iterate through each group
    for (const group of groups) {
      // Calculate the payment interval in milliseconds
      const paymentIntervalInMillis =
        group.paymentInterval * 24 * 60 * 60 * 1000;

      // Calculate the announcement time by subtracting payment interval from winner selection time
      const winnerSelectionDate = new Date(group.startDate);
      winnerSelectionDate.setDate(
        winnerSelectionDate.getDate() + group.roundDuration
      );
      const announcementDate = new Date(
        winnerSelectionDate.getTime() - paymentIntervalInMillis
      );

      // Schedule the announcement using cron expression
      cron.schedule(announcementDate, () =>
        announceUnpaidMembersBeforeWinnerSelection(group)
      );
    }
  } catch (error) {
    console.error("Error scheduling announcement:", error.message);
  }
};

export default adminUpaideAnnouncement;
