import express from "express";
import { signup } from "../../action/signup.js";
import { login } from "../../action/login.js";
const userRouter = express.Router();

// handling route using express router
userRouter.post("/signup", signup);
userRouter.post("/login", login);

export default userRouter;
