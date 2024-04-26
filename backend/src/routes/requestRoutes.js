import express from "express";

import {
  createRequest,
  deleteRequest,
  getRequests,
  getSingleRequest,
  updateRequest,
} from "../controllers/requestController.js";

const requestRouter = express.Router();

requestRouter.post("/create", createRequest);
requestRouter.get("/get", getRequests);
requestRouter.get("/get/:id", getSingleRequest);
requestRouter.delete("/delete/:id", deleteRequest);
requestRouter.put("/update/:id", updateRequest);
export default requestRouter;
