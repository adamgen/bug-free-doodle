import * as generate from "./utils/generate";
import request from "supertest";
import app from "../src/server";

it("returns a 200 on successful signup", async () => {
  const { email, password } = generate.signinForm();
  return await request(app)
    .post("/auth/signup")
    .send({ email, password })
    .expect(200);
});

it("returns a 400 with an invalid email", async () => {
  const { password } = generate.signinForm();
  const expectedResult = "Email must be valid";
  const res = await request(app)
    .post("/auth/signup")
    .send({
      email: "alskdflaskjfd",
      password,
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  const { email, password } = generate.signinForm();
  return request(app)
    .post("/auth/signup")
    .send({
      email,
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  const { email, password } = generate.signinForm();
  await request(app)
    .post("/auth/signup")
    .send({
      email,
    })
    .expect(400);

  await request(app)
    .post("/auth/signup")
    .send({
      password,
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  const { email, password } = generate.signinForm();
  await request(app)
    .post("/auth/signup")
    .send({
      email,
      password,
    })
    .expect(200);

  await request(app)
    .post("/auth/signup")
    .send({
      email,
      password,
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const { email, password } = generate.signinForm();
  const response = await request(app)
    .post("/auth/signup")
    .send({
      email,
      password,
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
