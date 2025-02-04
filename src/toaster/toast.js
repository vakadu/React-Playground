export class Toast {
  constructor() {
    this.toasts = [];
    this.subscribers = [];
  }

  subscribe = (callback) => {
    this.subscribers.push(callback);
  };

  addToast = (toast) => {
    this.toasts.push(toast);
    this.subscribers.forEach((callback) => callback(this.toasts));
  };
}
