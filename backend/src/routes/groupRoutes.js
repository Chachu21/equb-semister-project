import express from "express";
import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroupByUserId,
  getGroups,
  getGroupsByCreatorId,
  joinGroup,
  winnersList,
} from "../controllers/groupController.js";
import { verifyToken } from "../midleware/jwtMiddleware.js";

const groupRouter = express.Router();

groupRouter.post("/create", verifyToken, createGroup);
// groupRouter.get("/get/creator", verifyToken, getGroupByCreatorId);
groupRouter.get("/get", getGroups);
groupRouter.get("/get/:id", getGroup);
groupRouter.post("/join/:groupId", verifyToken, joinGroup);
groupRouter.delete("/delete/:id", verifyToken, deleteGroup);
groupRouter.put("/winner/:id", winnersList);
groupRouter.get("/get/by/:userId", verifyToken, getGroupByUserId);
groupRouter.get("/get/creator/:userId", verifyToken, getGroupsByCreatorId);

export default groupRouter;
