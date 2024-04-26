import express from "express";
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroup,
  getGroupByUserId,
  getGroups,
  joinGroup,
<<<<<<< .merge_file_K8JjQz
  winnersList,
=======
  getUserJoinedGroups,
>>>>>>> .merge_file_ooUruS
} from "../controllers/groupController.js";
import { verifyToken } from "../midleware/jwtMiddleware.js";

const groupRouter = express.Router();

groupRouter.post("/create", verifyToken, createGroup);
groupRouter.get("/", getAllGroups);
groupRouter.get("/get", getGroups);
groupRouter.get("/get/:id", getGroup);
groupRouter.get("/userJoinedGroups/:id", getUserJoinedGroups);
groupRouter.post("/join/:groupId", verifyToken, joinGroup);
<<<<<<< .merge_file_K8JjQz
groupRouter.delete("/delete/:id", verifyToken, deleteGroup);
groupRouter.put("/winner/:id", winnersList);
groupRouter.get("/get/by/:userId", verifyToken, getGroupByUserId);
=======
groupRouter.delete("/:id", verifyToken, deleteGroup);
>>>>>>> .merge_file_ooUruS

export default groupRouter;
