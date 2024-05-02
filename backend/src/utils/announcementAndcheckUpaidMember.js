import Notification from "../models/notification.js";
import Payment from "../models/payments.js";
import User from "../models/users.js";
import Group from "../models/groups.js";
import cron from "node-cron";

async function announceUnpaidMembersBeforeWinnerSelection(group) {
  try {
    let addation = 0;
    if (group.types === "daily" && group.paymentInterval === 1) {
      addation = 20 * 60 * 60 * 1000;
    } else if (group.types === "weekly") {
      addation = 24 * 60 * 60 * 1000;
    } else {
      addation = 2 * 24 * 60 * 60 * 1000;
    }

    const overdueMembers = [];
    const today = new Date();

    const winnerSelectionDate = new Date(group.startDate);
    const durationMilliseconds = group.roundDuration * 24 * 60 * 60 * 1000;
    winnerSelectionDate.setTime(
      winnerSelectionDate.getTime() + durationMilliseconds
    );

    const paymentIntervalInMillis = group.paymentInterval * 24 * 60 * 60 * 1000;
    const announcementDate = new Date(
      winnerSelectionDate.getTime() - paymentIntervalInMillis
    );

    if (today.toString() === announcementDate.toString()) {
      for (const member of group.members) {
        const userId = member;
        const userData = await User.findById(userId);
        if (!userData) continue;

        const payments = await Payment.find({
          user: userId,
          equbGroup: group._id,
          round: group.round,
        });

        const hasSuccessfulPayment = payments.some(
          (payment) => payment.status === "success"
        );

        if (!hasSuccessfulPayment) {
          overdueMembers.push(member);
        }
      }

      if (overdueMembers.length > 0) {
        const message = `Group ${
          group.name
        } has overdue payments from: ${overdueMembers.join(
          ", "
        )} before winner selection!`;
        console.log(message);

        for (const member of overdueMembers) {
          const notification = new Notification({
            message,
            groupId: group._id,
            userID: member,
          });
          await notification.save();
        }
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
      let addation = 0;
      if (group.types === "daily" && group.paymentInterval === 1) {
        addation = 3.25 * 60 * 60 * 1000;
      } else if (group.types === "weekly") {
        addation = 24 * 60 * 60 * 1000;
      } else {
        addation = 2 * 24 * 60 * 60 * 1000;
      }
      const paymentIntervalInMillis =
        group.paymentInterval * 24 * 60 * 60 * 1000;
      const winnerSelectionDate = new Date(group.startDate);
      const durationMilliseconds = group.roundDuration * 24 * 60 * 60 * 1000;

      winnerSelectionDate.setTime(
        winnerSelectionDate.getTime() + durationMilliseconds
      );
      console.log("winnerSelectionDate: " + winnerSelectionDate);
      const announcementDate = new Date(
        winnerSelectionDate.getTime() - paymentIntervalInMillis
      );
      console.log("from admin anouncement" + announcementDate);
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
      const cronPattern = `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} *`;
      console.log("from admin --------", cronPattern);
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
