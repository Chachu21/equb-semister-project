import cron from "node-cron";
import Group from "../models/groups.js";

// // Function to calculate the next winner selection date based on group's frequency
// function calculateNextWinnerSelectionDate(
//   startDate,
//   roundDuration,
//   currentRound
// ) {
//   const nextDate = new Date(startDate);
//   if (roundDuration === 1 || roundDuration === 0.00694) {
//     // Daily frequency
//     nextDate.setDate(nextDate.getDate() + currentRound);
//   } else if (roundDuration === 7) {
//     // Weekly frequency
//     nextDate.setDate(nextDate.getDate() + currentRound * 7);
//   } else if (roundDuration > 28 && roundDuration <= 31) {
//     // Monthly frequency
//     nextDate.setMonth(nextDate.getMonth() + currentRound);
//   }
//   return nextDate;
// }

// Schedule the winner selection function
const winnerSelection = async () => {
  try {
    const groups = await Group.find({ status: "started" });
    for (const group of groups) {
      // console.log(group);
      const winnerSelectionDate = new Date(group.startDate);
      const durationMilliseconds = group.roundDuration * 24 * 60 * 60 * 1000;
      // console.log(winnerSelectionDate, durationMilliseconds);
      winnerSelectionDate.setTime(
        winnerSelectionDate.getTime() + durationMilliseconds
      );
      const minutes = isNaN(winnerSelectionDate.getMinutes())
        ? "*"
        : winnerSelectionDate.getMinutes();
      const hours = isNaN(winnerSelectionDate.getHours())
        ? "*"
        : winnerSelectionDate.getHours();
      const dayOfMonth = isNaN(winnerSelectionDate.getDate())
        ? "*"
        : winnerSelectionDate.getDate();
      const month = isNaN(winnerSelectionDate.getMonth() + 1)
        ? "*"
        : winnerSelectionDate.getMonth() + 1;

      // Construct the cron pattern
      console.log("winner selectio date: " + winnerSelectionDate);
      console.log("today", Date());
      const cronPattern = `${minutes} ${hours} ${dayOfMonth} ${month} *`;
      console.log("from winnere selection cron", cronPattern);

      // Schedule the winner selection function
      cron.schedule(cronPattern, async () => {
        console.log("from winner selection");
        try {
          const today = new Date();
          console.log(`Scheduling function executed at: ${today}`);

          // Find groups that are started and need winner selection
          const groups = await Group.find({
            status: "started",
            startDate: { $lte: today }, // Start date is less than or equal to today
          });

          console.log("groups started date less than today", groups);
          // console.log(
          //   `[${today.toISOString()}] - Checking winner selection for ${
          //     groups.length
          //   } group(s).`
          // );

          // Check winner selection for each group
          for (const group of groups) {
            const winnerSelectionDate = new Date(group.startDate);
            const durationMilliseconds =
              group.roundDuration * 24 * 60 * 60 * 1000;
            // console.log(winnerSelectionDate, durationMilliseconds);
            winnerSelectionDate.setTime(
              winnerSelectionDate.getTime() + durationMilliseconds
            );
            // // const lastRound = group.rounds[group.rounds.length - 1];
            // const winnerSelectionDate = calculateNextWinnerSelectionDate(
            //   group.startDate,
            //   group.roundDuration,
            //   group.round
            // );
            // console.log("winner selection date", winnerSelectionDate);
            // Check if today is the winner selection date
            if (winnerSelectionDate.toDateString() === today.toDateString()) {
              await group.selectWinner();
            }
          }
        } catch (error) {
          console.error("Error selecting winner:", error);
        }
      });
    }
  } catch (error) {
    console.error("Error scheduling winner selection:", error);
  }
};

export default winnerSelection;
