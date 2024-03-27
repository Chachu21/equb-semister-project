const express = require("express");

require("dotenv").config();

const cors = require("cors");
const connectToDB = require("./config/db_config");
const app = express();
const port = process.env.PORT ||5000;

//for database connection
connectToDB();
//middleware
app.use(cors());


//server listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
