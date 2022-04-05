import * as generate from "./utils/generate";
import request from "supertest";
import app from "../src/server";

describe("Auth Flow ", () => {
  const { email, password } = generate.loginForm();
  test("register", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        email,
        password,
      })
      .expect(200);
  });
  test("login", async () => {
    // login
    const response = await request(app)
      .post("/auth/login")
      .send({
        email,
        password,
      })
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});

it("fails when a email that does not exist is supplied", async () => {
  const { email, password } = generate.loginForm();
  await request(app)
    .post("/auth/login")
    .send({
      email,
      password,
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  const { email, password } = generate.loginForm();
  await request(app)
    .post("/auth/register")
    .send({
      email,
      password,
    })
    .expect(200);

  await request(app)
    .post("/auth/login")
    .send({
      email,
      password: "Aa123456A",
    })
    .expect(400);
});
