import { useState } from "react";

const urls = [
  "https://example.com",
  "https://about.me",
  "https://news.site",
  "https://contact.info",
  "https://myportfolio.org",
  "https://funnyclips.tv",
  "https://techhub.dev",
  "https://foodrecipes.net",
  "https://traveldiary.io",
  "https://gamezone.gg",
];

export default function NotificationQueue() {
  const [notifications, setNotifications] = useState([]);

  const random = () => {
    const rand = Math.floor(Math.random() * urls.length);
    return urls[rand];
  };

  const handleAddNotitfication = () => {
    const id = Date.now();
    const randomNoti = random();
    setNotifications((prev) => [...prev, { id, msg: randomNoti }]);

    setTimeout(() => {
      handleRemove(id);
    }, 1000);
  };

  const handleRemove = (id) => {
    setNotifications((prev) => prev.filter((noti) => noti.id !== id));
  };

  const handleRemoveNotitfication = () => {
    const last = notifications.slice(0, notifications.length - 1);
    setNotifications(last);
  };

  return (
    <div>
      {notifications
        .slice()
        .reverse()
        .map((notification) => {
          return (
            <div style={{ display: "flex", gap: 12 }} key={notification.id}>
              <div>{notification.msg}</div>
              <div
                style={{ color: "red" }}
                onClick={() => handleRemove(notification.id)}
              >
                X
              </div>
            </div>
          );
        })}

      <button onClick={handleAddNotitfication}>Add</button>
      <button onClick={handleRemoveNotitfication}>Remove</button>
    </div>
  );
}
