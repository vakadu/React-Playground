class ChatService {
  constructor() {
    this.suscribers = new Set();
    this.users = new Map();
  }

  suscribe(callback) {
    this.suscribers.add(callback);
  }

  unsubscribe(callback) {
    this.suscribers.delete(callback);
    // this.suscribers.filter((sub) => sub !== callback);
  }

  addUser(user) {
    if (this.users.has(user.name)) {
      return alert("User exists");
    }

    this.users.set(user.name, user);
    this.notify();
  }

  sendMessage(user) {
    console.log(user);

    if (!this.users.has(user.name)) {
      return alert("No user with the name exists");
    }

    const updateUser = this.users.get(user.name);
    this.users.set(user.name, {
      ...updateUser,
      msg: `${Date.now()} random message`,
    });
    console.log(this.users);

    this.notify();
  }

  notify() {
    this.suscribers.forEach((suscriber) => suscriber(this.users));
  }
}

export const chatService = new ChatService();
