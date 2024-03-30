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

const app = express();
const port = process.env.PORT;
// Middleware
app.use(cors());
app.use(express.json());

// Define your routes here
app.use("/api/v1/users", userRouter);
//connect to the database
createDatabase();
//localhost:3000/api/v1/users/signUp
// Start the server
http: app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
