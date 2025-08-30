import axios, { AxiosResponse } from "axios";
export interface UserProps {
  id: string;
  name: string;
  age: number;
}

type Cb = () => void;

export class User {
  events: { [key: string]: Cb[] } = {};

  constructor(private data: Partial<UserProps>) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update);
    this.trigger("change");
  }

  on(eventName: string, cb: Cb): void {
    const handlers = this.events[eventName] || [];
    handlers.push(cb);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callbackfn => callbackfn());
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get("id")}`).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }
}
