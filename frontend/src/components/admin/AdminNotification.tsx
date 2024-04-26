
import React, { useState } from "react";

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

const NotificationComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
  
    { id: 1, message: "Reminder: Team meeting at 3 PM today", read: false },
    {
      id: 2,
      message: "New product launch tomorrow! Prepare your team!",
      read: false,
    },
    { id: 3, message: "Congratulations! You've won a prize!", read: false },
    {
      id: 4,
      message: "Important: System maintenance scheduled for next week",
      read: false,
    },
    {
      id: 5,
      message: "Don't forget to submit your report by EOD",
      read: true,
    }
   
  ]);

  const [hoveredNotification, setHoveredNotification] = useState<number | null>(
    null
  );

  const unseenCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="container mx-auto mt-10">
      {unseenCount > 0 && (
        <div className="bg-[#008B8B] text-white py-2 px-4 mb-4 rounded">
          You have <span className="font-bold">{unseenCount} </span> unseen notifications
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border bg-white rounded ${
              notification.read ? "text-gray-500" : "font-bold"
            } flex items-center relative`}
            onMouseEnter={() => setHoveredNotification(notification.id)}
            onMouseLeave={() => setHoveredNotification(null)}
          >
            <div>{notification.message}</div>
            {hoveredNotification === notification.id && (
              <button
                onClick={() => deleteNotification(notification.id)}
                className="text-red-500 absolute right-0 text-2xl"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                X
              </button>
            )}
            <button
              onClick={() => markAsRead(notification.id)}
              className="bg-[#008B8B] text-white py-1 px-2 rounded ml-auto"
            >
              mark as read
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationComponent;
