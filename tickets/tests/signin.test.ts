import * as generate from "./utils/generate";
import request from "supertest";
import app from "../src/server";

describe("Auth Flow ", () => {
  const { email, password } = generate.signinForm();
  test("signup", async () => {
    await request(app)
      .post("/auth/signup")
      .send({
        email,
        password,
      })
      .expect(200);
  });
  test("signin", async () => {
    // signin
    const response = await request(app)
      .post("/auth/signin")
      .send({
        email,
        password,
      })
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});

it("fails when a email that does not exist is supplied", async () => {
  const { email, password } = generate.signinForm();
  await request(app)
    .post("/auth/signin")
    .send({
      email,
      password,
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  const { email, password } = generate.signinForm();
  await request(app)
    .post("/auth/signup")
    .send({
      email,
      password,
    })
    .expect(200);

  await request(app)
    .post("/auth/signin")
    .send({
      email,
      password: "Aa123456A",
    })
    .expect(400);
});
