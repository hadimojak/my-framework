import { User } from "./models/User";

const user = new User({ name: "new record", age: 0 });

user.on("change", () => {
  console.log("user hcanged");
});

user.set({ name: "ali" });
