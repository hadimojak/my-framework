import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
export interface UserProps {
  id: string;
  name: string;
  age: number;
}

export class User {
  public events: Eventing = new Eventing();

  constructor(private data: Partial<UserProps>) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update);
    this.events.trigger("change");
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get("id")}`).then((res: AxiosResponse): void => {
      this.set(res.data);
      console.log(res.data);
    });
  }

  save(): void {
    const id = this.get("id");

    if (id) {
      //put
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      //post
      axios.post(`http://localhost:3000/users`, this.data);
    }
  }
}
