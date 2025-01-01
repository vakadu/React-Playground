import { useEffect, useState } from "react";
import { notificationService } from "./service";

export default function List() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const update = (newNotifications) => {
      console.log(newNotifications, "===");

      setNotifications([...newNotifications]);
    };

    notificationService.subscribe(update);
  }, []);

  return (
    <div>
      {notifications.map((l) => {
        return <div>{l}</div>;
      })}
    </div>
  );
}
