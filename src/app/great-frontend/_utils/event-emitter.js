export class EventEmitter {
  constructor() {
    // throw 'Not implemented!';
    this.listeners = new Map()
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    // throw 'Not implemented!';
    if(!this.listeners.has(eventName)) {
        this.listeners.set(eventName, new Set())
    }
    this.listeners.get(eventName).add(listener);
    return this
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    this.listeners.get(eventName)?.delete(listener);
    return this
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    if (!this.listeners.has(eventName)) return false;
    const temp = this.listeners.get(eventName);    
    for (const element of temp) {
        element(...args)        
    }

    return true
  }
}