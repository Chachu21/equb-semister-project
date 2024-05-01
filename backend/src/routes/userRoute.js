import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginController,
  // logoutController,
  forgotPassword,
  resetPassword,
  getResetPassword,
} from "../controllers/userController.js";
import { verifyToken } from "../midleware/jwtMiddleware.js";
import isAdmin from "../midleware/isAdmin.js";
const userRouter = express.Router();

userRouter.get("resetPassword/:token", getResetPassword);
userRouter.get("/", getUsers);
userRouter.post("/login", loginController);
// userRouter.post("/logout", logoutController);

userRouter.get("/get/:id", getUserById);

userRouter.post("/signUp", createUser);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.post("/resetPassword/:token", resetPassword);

userRouter.put("/update/:id", updateUser);

userRouter.delete("/delete/:id", verifyToken, isAdmin, deleteUser);

export default userRouter;
