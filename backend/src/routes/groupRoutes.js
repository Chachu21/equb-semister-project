import express from "express";
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroup,
  getGroups,
  joinGroup,
} from "../controllers/groupController.js";
import { verifyToken } from "../midleware/jwtMiddleware.js";

const groupRouter = express.Router();

groupRouter.post("/create", verifyToken, createGroup);
groupRouter.get("/", getAllGroups);
groupRouter.get("/get", getGroups);
groupRouter.get("/get/:id", getGroup);
groupRouter.post("/join/:groupId", verifyToken, joinGroup);
groupRouter.delete("/delete/:id", verifyToken, deleteGroup);

export default groupRouter;
