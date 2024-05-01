import express from "express";
import {
  getNotifications,
  getNotificationById,
  deleteNotification,
  markNotificationAsRead,
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

//Get all notifications
notificationRouter.get("/get", getNotifications);

//Get single notification by ID
notificationRouter.get("/get/:id", getNotificationById);

//Delete comments
notificationRouter.delete("/delete/:id", deleteNotification);
notificationRouter.patch("/markAsRead/:id", markNotificationAsRead);

export default notificationRouter;
