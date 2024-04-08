import express from "express";
import upload from "../config/multer-config.js";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginController,
  logoutController,
  forgotPassword,
  resetPassword,
  getResetPassword,
  uploadImage,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("resetPassword/:token", getResetPassword);
userRouter.get("/", getUsers);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);

userRouter.get("/:id", getUserById);

userRouter.post("/signUp", createUser);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.post("/resetPassword/:token", resetPassword);
userRouter.post("/upload", upload.single("image"), uploadImage);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
