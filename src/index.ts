import { User } from "./models/User";

const user = new User({ name: "aooo", age: 42 });

user.sync.save({ id: "f13e", name: "ali", age: 50 });

user.events.on("change", () => {
  console.log("changed");
});

user.events.trigger("change");
