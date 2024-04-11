import cron from "node-cron";
import Payment from "../models/payments.js";
import User from "../models/users.js";
import Group from "../models/groups.js";

async function sendPrePaymentReminder(user, group) {
  try {
    // Sending a pre-payment reminder notification to the user via SMS
    const message = `Hi ${user.name}, it's time to make your payment for the next round in group ${group.name}. Please make your payment soon.`;
    // Send SMS function here
  } catch (error) {
    console.error("Error sending pre-payment reminder:", error.message);
  }
}

async function sendPostPaymentNotification(user, group) {
  try {
    // Sending a post-payment notification to the user via SMS
    const message = `Hi ${user.name}, your payment for the next round in group ${group.name} has been received successfully. Thank you!`;
    // Send SMS function here
  } catch (error) {
    console.error("Error sending post-payment notification:", error.message);
  }
}

async function sendPaymentDeadlineNotification(user, group) {
  try {
    // Sending a payment deadline notification to the user via SMS
    const message = `Hi ${user.name}, the payment deadline for the next round in group ${group.name} has passed. Please make your payment as soon as possible to avoid any issues.`;
    // Send SMS function here
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
  } catch (error) {
    console.error(
      "Error sending post-reminder for unpaid payments:",
      error.message
    );
  }
}

async function announcementOfUser(group) {
  try {
    const today = new Date();
    const overdueMembers = [];

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
        await sendPaymentDeadlineNotification(userData, group);
      }
    }

    if (overdueMembers.length > 0) {
      for (const overdueMember of overdueMembers) {
        const userData = await User.findById(overdueMember);
        if (userData) {
          await sendPostReminderForUnpaidPayments(userData, group);
        }
      }
    } else {
      // If there are no overdue payments, send pre-payment reminders to all members
      for (const member of group.members) {
        const userId = member;
        const userData = await User.findById(userId);
        if (userData) {
          await sendPrePaymentReminder(userData, group);
        }
      }
    }
  } catch (error) {
    console.error(
      "Error announcing unpaid members before winner selection:",
      error.message
    );
  }
}

const userScheduleAnnouncement = async () => {
  console.log(" i am schedule announcement ");

  console.log(Group.find({ status: "pending" }));

  try {
    const groups = await Group.find({ status: "started" });
    for (const group of groups) {
      const paymentIntervalInMillis =
        group.paymentInterval * 24 * 60 * 60 * 1000;
      const winnerSelectionDate = new Date(group.startDate);
      winnerSelectionDate.setDate(
        winnerSelectionDate.getDate() + group.roundDuration
      );
      const announcementDate = new Date(
        winnerSelectionDate.getTime() - paymentIntervalInMillis
      );
      cron.schedule(announcementDate, () => announcementOfUser(group));
    }
  } catch (error) {
    console.error("Error scheduling announcement:", error.message);
  }
};

export default userScheduleAnnouncement;
