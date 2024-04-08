import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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
import requestRouter from "./routes/requestRoutes.js";

const app = express();
const port = process.env.PORT;
// Middleware
app.use(cors());
app.use(express.json());

// Define your routes here
app.use("/api/v1/users", userRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/request", requestRouter);
//connect to the database
createDatabase();
//localhost:3000/api/v1/users/signUp
// Start the server
http: app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
