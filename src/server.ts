import db from "./config/sequelize";
import express from "express";
import adminRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import morgan from "morgan";
import "dotenv/config";
import session from "cookie-session";
import cookieParser from "cookie-parser";

//FIXME
declare var process: {
  env: any;
};
let server: any;
async function startServer({ port = process.env.PORT } = {}) {
  await db.sync().then(() => {
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

  server = app.listen(port, () => {
    console.log("server is running on port " + port);
  });

  return app;
}

async function close() {
  server.close();
}

export default startServer;
