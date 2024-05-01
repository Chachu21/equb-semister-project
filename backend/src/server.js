import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import createDatabase from "./config/dbConfig.js";
import userRouter from "./routes/userRoute.js";
import groupRouter from "./routes/groupRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import paymentRouter from "./routes/paymentRoute.js";
import requestRouter from "./routes/requestRoutes.js";
import userScheduleAnnouncement from "./utils/userAnnouncement.js";
import adminUpaideAnnouncement from "./utils/announcementAndcheckUpaidMember.js";
import winnerSelection from "./utils/automticSelectWinner.js";
import notificationRouter from "./routes/notificationRoute.js";

const app = express();
dotenv.config();
const port = process.env.PORT;
//connect to the database
createDatabase();
// Middleware
app.use(cors());
// Increase the limit for request payload size
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Define your routes here
app.use("/api/v1/users", userRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/notification", notificationRouter);

//for user announcements
userScheduleAnnouncement();
//for admin  about unpaid announcements
adminUpaideAnnouncement();
//for winner
winnerSelection();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
