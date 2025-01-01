class NotificationService {
  constructor() {
    this.subscribers = [];
    this.notifications = [];
  }

  subscribe(callback) {
    console.log(callback, "callba");

    this.subscribers.push(callback);
  }

  unsubscribe() {}

  addNotification(notification) {
    this.notifications.push(notification);
    this.subscribers.forEach((callback) => callback(this.notifications));
  }
}

export const notificationService = new NotificationService();
