import express from "express";
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroup,
  getGroupByUserId,
  getGroups,
  joinGroup,
  winnersList,
} from "../controllers/groupController.js";
import { verifyToken } from "../midleware/jwtMiddleware.js";

const groupRouter = express.Router();

groupRouter.post("/create", verifyToken, createGroup);
groupRouter.get("/", getAllGroups);
groupRouter.get("/get", getGroups);
groupRouter.get("/get/:id", getGroup);
groupRouter.get("/userJoinedGroups/:id", getUserJoinedGroups);
groupRouter.post("/join/:groupId", verifyToken, joinGroup);
groupRouter.delete("/delete/:id", verifyToken, deleteGroup);
groupRouter.put("/winner/:id", winnersList);
groupRouter.get("/get/by/:userId", verifyToken, getGroupByUserId);

export default groupRouter;
