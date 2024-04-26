import cron from "node-cron";
import Group from "../models/groups.js";

// Schedule the job to run daily
const winnerSelection = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const today = new Date();
      console.log(`Scheduling function executed at: ${today.toISOString()}`);

      // Find groups that are started and need winner selection
      const groups = await Group.find({
        status: "started",
        startDate: { $lte: today }, // Start date is less than or equal to today
      });

      console.log(
        `[${today.toISOString()}] - Checking winner selection for ${
          groups.length
        } group(s).`
      );

      // Check winner selection for each group
      for (const group of groups) {
        const lastRound = group.rounds[group.rounds.length - 1];
        const winnerSelectionDate = calculateNextWinnerSelectionDate(
          group.startDate,
          lastRound.roundDuration,
          lastRound.round_no
        );
        console.log(group);
        console.log(
          `[${today.toISOString()}] - Next winner selection date for group ${
            group.name
          }: ${winnerSelectionDate.toISOString()}`
        );

        // Check if today is the winner selection date
        if (winnerSelectionDate.toDateString() === today.toDateString()) {
          console.log(
            `[${today.toISOString()}] - Selecting winner for group ${
              group.name
            }`
          );
          await group.selectWinner();
          // Update start date for the next round
          group.startDate.setDate(group.startDate.getDate() + 1);
          await group.save();
          console.log(
            `[${today.toISOString()}] - Start date updated for group ${
              group.name
            }`
          );
        }
      }
    } catch (error) {
      console.error("Error selecting winner:", error);
    }
  });
};

export default winnerSelection;

// Function to calculate the next winner selection date based on group's frequency
function calculateNextWinnerSelectionDate(
  startDate,
  roundDuration,
  currentRound
) {
  const nextDate = new Date(startDate);
  if (roundDuration === 1) {
    // Daily frequency
    nextDate.setDate(nextDate.getDate() + currentRound);
  } else if (roundDuration === 7) {
    // Weekly frequency
    nextDate.setDate(nextDate.getDate() + currentRound * 7);
  } else if (roundDuration > 28 && roundDuration <= 31) {
    // Monthly frequency
    nextDate.setMonth(nextDate.getMonth() + currentRound);
  }
  return nextDate;
}
