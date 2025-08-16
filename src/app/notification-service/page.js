"use client";

import List from "./list";
import { notificationService } from "./service";

export default function NotificationApp() {
  const addNotification = () => {
    const message = `${Date.now()} random message`;
    notificationService.addNotification(message);
  };

  return (
    <div>
      <button onClick={addNotification}>Add Notification</button>
      <List />
    </div>
  );
}
