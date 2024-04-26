import cron from "node-cron";
import Payment from "../models/payments.js";
import User from "../models/users.js";
import Group from "../models/groups.js";
import sendSMS from "../config/sendSMS.js";
async function sendPrePaymentReminder(user, group) {
  try {
    // Sending a pre-payment reminder notification to the user via SMS
    const message = `Hi ${user.name}, it's time to make your payment for the next round in group ${group.name}. Please make your payment soon.`;
    // Send SMS function here
    sendSMS(user.phone, message);
    // console.log(message);
  } catch (error) {
    console.error("Error sending pre-payment reminder:", error.message);
  }
}

async function sendPostPaymentNotification(user, group) {
  try {
    // Sending a post-payment notification to the user via SMS
    const message = `Hi ${user.name}, your payment for the next round in group ${group.name} has been received successfully. Thank you!`;
    // Send SMS function here
    sendSMS(user.phone, message);
    // console.log(message);
  } catch (error) {
    console.error("Error sending post-payment notification:", error.message);
  }
}

async function sendPaymentDeadlineNotification(user, group) {
  try {
    // Sending a payment deadline notification to the user via SMS
    const message = `Hi ${user.name}, the payment deadline for the next round in group ${group.name} has passed. Please make your payment as soon as possible to avoid any issues.`;
    // Send SMS function here
    // sendSMS(user.phone, message);
    console.log(message);
  } catch (error) {
    console.error(
      "Error sending payment deadline notification:",
      error.message
    );
  }
}

async function sendPostReminderForUnpaidPayments(user, group) {
  try {
    // Sending a post-reminder for unpaid payments after the payment deadline
    const message = `Hi ${user.name}, the payment deadline for the next round in group ${group.name} has passed, and your payment is still pending. Please make your payment as soon as possible to avoid any issues.`;
    // Send SMS function here
    sendSMS(user.phone, message);
    // console.log(message);
  } catch (error) {
    console.error(
      "Error sending post-reminder for unpaid payments:",
      error.message
    );
  }
}

async function announcementOfUser(group) {
  let addation = 0;
  if (group.types === "daily") {
    addation = 20 * 60 * 60 * 1000;
  } else if (group.types === "weekly") {
    addation = 24 * 60 * 60 * 1000;
  } else {
    addation = 2 * 24 * 60 * 60 * 1000;
  }
  try {
    const today = new Date();
    const overdueMembers = [];
    const logMessages = []; // Array to store log messages for each announcement

    for (const member of group.members) {
      const userId = member;
      const userData = await User.findById(userId);
      if (!userData) continue;

      const payments = await Payment.find({
        userId,
        groupId: group._id,
        status: "started",
      });

      if (!payments.length) continue;

      const lastPayment = payments[payments.length - 1];
      const paymentIntervalInMillis =
        group.paymentInterval * 24 * 60 * 60 * 1000;
      const paymentDeadline = new Date(
        lastPayment.date.getTime() + paymentIntervalInMillis
      );

      if (today > paymentDeadline) {
        overdueMembers.push(member);
        logMessages.push(
          `Sent payment deadline notification to ${userData.name}`
        );
        await sendPaymentDeadlineNotification(userData, group);
      }
    }

    if (overdueMembers.length > 0) {
      for (const overdueMember of overdueMembers) {
        const userData = await User.findById(overdueMember);
        if (userData) {
          logMessages.push(
            `Sent post-reminder for unpaid payment to ${userData.name}`
          );
          await sendPostReminderForUnpaidPayments(userData, group);
        }
      }
    } else {
      // If there are no overdue payments, send pre-payment reminders to all members
      for (const member of group.members) {
        const userId = member;
        const userData = await User.findById(userId);
        if (userData) {
          logMessages.push(`Sent pre-payment reminder to ${userData.name}`);
          await sendPrePaymentReminder(userData, group);
        }
      }
    }

    // After the loops, log all messages at once
    // console.log(logMessages);
  } catch (error) {
    console.error(
      "Error announcing unpaid members before winner selection:",
      error.message
    );
  }
}

const userScheduleAnnouncement = async () => {
  try {
    const groups = await Group.find({ status: "started" });
    // console.log(groups);
    for (const group of groups) {
      const paymentIntervalInMillis =
        group.paymentInterval * 24 * 60 * 60 * 1000;
      const winnerSelectionDate = new Date(group.startDate);
      winnerSelectionDate.setDate(
        winnerSelectionDate.getDate() + group.roundDuration
      );
      console.log("winner selation date: " + winnerSelectionDate);
      const announcementDate = new Date(
        winnerSelectionDate.getTime() - paymentIntervalInMillis
      );
      // console.log("winnerSelectionDate", winnerSelectionDate);
      // console.log("announcementDate", announcementDate);
      // Ensure all components of the cron pattern are valid numbers
      const seconds = isNaN(announcementDate.getSeconds())
        ? "*"
        : announcementDate.getSeconds();
      const minutes = isNaN(announcementDate.getMinutes())
        ? "*"
        : announcementDate.getMinutes();
      const hours = isNaN(announcementDate.getHours())
        ? "*"
        : announcementDate.getHours();
      const dayOfMonth = isNaN(announcementDate.getDate())
        ? "*"
        : announcementDate.getDate();
      const month = isNaN(announcementDate.getMonth() + 1)
        ? "*"
        : announcementDate.getMonth() + 1;
      // Construct the cron pattern
      const cronPattern = `${minutes} ${hours} ${dayOfMonth} ${month} *`;
      console.log("from user announce", cronPattern);
      // Schedule announcementOfUser function to run on the calculated announcement date
      cron.schedule(cronPattern, () => announcementOfUser(group));
    }
  } catch (error) {
    console.error("Error scheduling announcement:", error.message);
  }
};

export default userScheduleAnnouncement;
