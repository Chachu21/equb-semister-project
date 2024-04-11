import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
//mine nly
import crypto from "crypto";
import nodemailer from "nodemailer";
//

dotenv.config();
import createDatabase from "./config/dbConfig.js";
import userRouter from "./routes/userRoute.js";
import groupRouter from "./routes/groupRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import paymentRouter from "./routes/paymentRoute.js";
import userScheduleAnnouncement from "./utils/userAnnouncement.js";
import adminUpaideAnnouncement from "./utils/announcementAndcheckUpaidMember.js";

const app = express();
const port = process.env.PORT;
// Middleware
app.use(cors());
// Increase the limit for request payload size
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//connect to the database
createDatabase();
// Define your routes here
app.use("/api/v1/users", userRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/payment", paymentRouter);

//for user announcements
userScheduleAnnouncement();

adminUpaideAnnouncement();
//localhost:3000/api/v1/users/signUp
// Start the server
http: app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
