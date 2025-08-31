export class Attributes<T> {
  constructor(private data: Partial<T>) {}

  get<K extends keyof T>(key: K): T[K] | undefined {
    return this.data[key];
  }

  set(update: Partial<T>): void {
    Object.assign(this.data, update);
    // this.events.trigger("change");
  }
}
