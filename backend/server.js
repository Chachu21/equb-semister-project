import express from "express";
import cors from "cors";
import userRouter from "./src/routes/userRoute.js/user.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing

app.use("/api/v1/auth", userRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
