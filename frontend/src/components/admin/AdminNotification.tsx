import axios from "axios";
import React, { useState, useEffect } from "react";

interface Notification {
  _id: number;
  message: string;
  read: boolean;
}

const NotificationComponent: React.FC = () => {
  const [hoveredNotification, setHoveredNotification] = useState<number | null>(
    null
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unseenCount, setUnseenCount] = useState<number>(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/notification/get"
        );
        setNotifications(response.data.notifications);
        setUnseenCount(response.data.unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/notification/markAsRead/${id}`
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
      setUnseenCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/notification/delete/${id}`
      );
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );
      setUnseenCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      {unseenCount > 0 && (
        <div className="bg-[#008B8B] text-white py-2 px-4 mb-4 rounded">
          You have <span className="font-bold">{unseenCount} </span> unseen
          notifications
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className={`p-4 border bg-white rounded ${
              notification.read ? "text-gray-500" : "font-bold"
            } flex items-center relative`}
            onMouseEnter={() => setHoveredNotification(notification._id)}
            onMouseLeave={() => setHoveredNotification(null)}
          >
            <div>{notification.message}</div>
            {hoveredNotification === notification._id && (
              <button
                onClick={() => deleteNotification(notification._id)}
                className="text-red-500 absolute right-0 text-2xl"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                X
              </button>
            )}
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification._id)}
                className="bg-[#008B8B] text-white py-1 px-2 rounded ml-auto"
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationComponent;
