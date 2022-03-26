import db from "./config/sequelize";
import express from "express";
import adminRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import morgan from "morgan";
import * as dotenv from "dotenv";
import session from "cookie-session";
import cookieParser from "cookie-parser";

//FIXME
declare var process: {
  env: any;
};

db.sync().then(() => {
  console.log("connect to db");
});

const app = express();

app.use(cookieParser());
app.use(
  session({
    keys: [process.env.ACCESS_TOKEN_SECRET, process.env.REFRESH_TOKEN_SECRET],
    httpOnly: false,
    secure: false,
    maxAge: 30000,
  })
);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/", adminRouter);

const port = 9000;

app.listen(port, () => {
  console.log("server is running on port " + port);
});
