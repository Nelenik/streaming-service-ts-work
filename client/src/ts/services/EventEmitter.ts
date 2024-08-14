type Listener = (...args: unknown[]) => void;

export class EventEmitter {
  private events: { [key: string]: (() => void)[] } = {};

  static instance = new EventEmitter();

  // Подписка на событие
  on(event: string, listener: Listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // Отмена подписки на событие
  off(event: string, listener: Listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  // Испускание события
  emit(event: string, ...args: unknown[]) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener: Listener) => listener(...args));
  }
}
