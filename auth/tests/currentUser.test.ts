import * as generate from "./utils/generate";
import request from "supertest";
import app from "../src/server";

it("responds with details about the current user", async () => {
  // const cookie = await global.signin();
  const { email, password } = generate.signinForm();
  const signup = await request(app).post("/auth/signup").send({
    email,
    password,
  });

  const cookie = signup.get("Set-Cookie");

  const response = await request(app)
    .get("/auth/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.user.email).toEqual(email);
});

// it("responds with null if not authenticated", async () => {
//   const response = await request(app)
//     .get("/auth/currentuser")
//     .send()
//     .expect(200);

//   expect(response.body.user).toEqual(null);
// });
