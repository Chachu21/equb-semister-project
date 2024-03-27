import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginController,
  logoutController,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);

userRouter.get("/:id", getUserById);

userRouter.post("/signUp", createUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
