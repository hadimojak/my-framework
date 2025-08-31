import { User } from "./models/User";

const user = new User({ id: "16b7", name: "ali", age: 50 });

user.save();

user.events.on("change", () => {
  console.log("changed");
});

user.events.trigger("change");
