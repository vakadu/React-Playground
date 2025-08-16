export class QueryClient {
  constructor() {
    this.cache = new Map();
    this.listners = new Map();
  }

  async fetchQuery(key, fn) {
    if (this.cache.has(key)) {
      return this.cache.get(key).data;
    }

    this.cache.set(key, { status: "loading", data: null });

    try {
      const response = await fn();
      this.cache.set(key, { status: "success", data: response });
      return response;
    } catch (error) {
      this.cache.set(key, { status: "error", data: null });
    }
  }

  subscribe() {}
}
