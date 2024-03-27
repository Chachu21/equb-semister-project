const mongoose = require("mongoose");

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const connectToDB = async () => {
  try {
    const DBConnection = await mongoose.connect(`${MONGO_DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
