import express from "express";
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
} from "../controllers/commentController.js";
import { verifyToken } from "../midleware/jwtMiddleware.js";
const commetRouter = express.Router();

//Create a comment
commetRouter.post("/create", verifyToken, createComment);

//Get all comments
commetRouter.get("/get", getComments);

//Get single comment by ID
commetRouter.get("/get/:id", getCommentById);

//Delete comments
commetRouter.delete("/delete/:id", deleteComment);

export default commetRouter;
