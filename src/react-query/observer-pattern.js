class Channel {
  constructor(name) {
    this.name = name;
    this.subscribers = new Map();
  }

  subscribe(observer) {
    if (this.subscribers.has(observer.username)) {
      return "You have already subscribed to the channel";
    }

    this.subscribers.set(observer.username, observer);
    console.log(`${observer.username} subscribed to the channel`);
  }

  unsubscribe(username) {
    if (!this.subscribers.has(username)) {
      return "You have not subscribed to the channel";
    }

    this.subscribers.delete(username);
    console.log(`${username} has been unsubscribed to the channel`);
  }

  notify(message) {
    this.subscribers.forEach((observer) => observer.update(message));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(message) {
    console.log(`${this.name} received notification ${message}`);
  }
}

const channel1 = new Channel("reviews");

const obs1 = new Observer("vakadu");
const obs2 = new Observer("vakadu11");

channel1.subscribe(obs1);
channel1.subscribe(obs2);
channel1.notify("New video uploaded");
