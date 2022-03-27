// Testing Authentication API Routes
// 💯 Test all the edge cases

import axios from "axios";
import * as generate from "./utils/generate";
import {
  getData,
  getDataAndCookie,
  handleRequestFailure,
  resolve,
} from "./utils/async";
import * as usersDB from "../src/model/User";
import startServer from "../src/server";
import cookieParser from "cookie-parser";

// import { User } from "../model/User";

let api, server;

beforeAll(async () => {
  server = await startServer();
  server.use(cookieParser);
  const baseURL = `http://localhost:${process.env.PORT}/`;
  api = axios.create({ baseURL });
  // api.interceptors.response.use(getDataAndCookie, handleRequestFailure);
});

// afterAll(() => server.close());

//TODO
// import { resetDb } from "utils/db-utils";
// beforeEach(() => resetDb());
describe("Auth Flow", () => {
  const { email, password } = generate.loginForm();
  test("register", async () => {
    console.log(email, password);
    // register
    const rData = await api.post("auth/register", { email, password });
    expect(rData.status).toBe(200);
  });
  test("login", async () => {
    // login
    const lData = await api.post("auth/login", { email, password });
    expect(lData.status).toBe(200);

    //TODO authenticated request
    // const mData = await api.get("auth/me", {
    //   headers: {
    //     Authorization: `Bearer ${lData.user.token}`,
    //   },
    // });
    // expect(mData.user).toEqual({
    //   token: expect.any(String),
    //   id: expect.any(String),
    //   username,
    // });
  });
});

test("email must be unique", async () => {
  const { email, password } = generate.loginForm();
  const rData = await api.post("auth/register", { email, password });

  const error = await api
    .post("auth/register", { email, password })
    .catch((e) => e.response);
  expect(error.status).toBe(400);
  expect(error.data).toMatchSnapshot(`{message:'email taken'}`);
  // console.log("er", error);
  // expect(error.status).toBe(400);

  //   const error = await api
  //     .post("auth/register", { email, password: "Nancy-is-#1" })
  //     .catch(resolve);
  //   expect(error).toMatchInlineSnapshot(
  //     `[Error: 400: {"message":"email taken"}]`
  //   );
});
//TODO
// test("get me unauthenticated returns error", async () => {
//   const error = await api.get("auth/me").catch(resolve);
//   expect(error).toMatchInlineSnapshot(
//     `[Error: 401: {"code":"credentials_required","message":"No authorization token was found"}]`
//   );
// });

test("email required to register", async () => {
  const error = await api
    .post("auth/register", { password: generate.password() })
    .catch((e) => e.response);
  expect(error.status).toBe(400);
  expect(error.data).toMatchSnapshot(`{message: "email can't be blank"}`);
});

test("password required to register", async () => {
  const error = await api
    .post("auth/register", { email: generate.email() })
    .catch((e) => e.response);
  expect(error.status).toBe(400);
  expect(error.data).toMatchSnapshot(`{message:"password can't be blank"}`);
});

// test("email required to login", async () => {
//   const error = await api
//     .post("auth/login", { password: generate.password() })
//     .catch(resolve);
//   expect(error).toMatchInlineSnapshot(
//     `[Error: 400: {"message":"email can't be blank"}]`
//   );
// });

// test("password required to login", async () => {
//   const error = await api
//     .post("auth/login", { email: generate.email() })
//     .catch(resolve);
//   expect(error).toMatchInlineSnapshot(
//     `[Error: 400: {"message":"password can't be blank"}]`
//   );
// });

// test("user must exist to login", async () => {
//   const error = await api
//     .post("auth/login", generate.loginForm({ email: "__will_never_exist__" }))
//     .catch(resolve);
//   expect(error).toMatchInlineSnapshot(
//     `[Error: 400: {"message":"email or password is invalid"}]`
//   );
// });
