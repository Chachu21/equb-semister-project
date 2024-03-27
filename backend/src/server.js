import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import createDatabase from "./config/dbConfig.js";

const app = express();
const port = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

// Define your routes here

//connect to the database
createDatabase();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
