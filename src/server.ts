import db from "./config/sequelize";
import express from "express";
import userRouter from "./routes/user.route";
import morgan from "morgan";
const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("", userRouter);

db.sync().then(() => {
  console.log("connect to db");
});

const port = 9000;

app.listen(port, () => {
  console.log("server is running on port " + port);
});
