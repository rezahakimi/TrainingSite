import db from "../models/index.js";

//const Role = db.role;

const connectDB = async () => {
  db.mongoose
    .connect(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
      //"mongodb+srv://rezahakimi:publickey@cluster0.48qli8k.mongodb.net/myProgrammingTrainingDb?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
};

/* const initial = async () => {
  new Role({
    name: "user",
  })
    .save()
    .then(() => {
      console.log("added 'user' to roles collection");
    })
    .catch((err) => {
      console.log("error", err);
    });

  new Role({
    name: "moderator",
  }).save()
    .then(() => {
      console.log("added 'moderator' to roles collection");
    })
    .catch((err) => {
      console.log("error", err);
    });

  new Role({
    name: "admin",
  }).save()
  .then(() => {
    console.log("added 'admin' to roles collection");
  })
  .catch((err) => {
    console.log("error", err);
  });

}; */

//export { initial };
export default connectDB;
