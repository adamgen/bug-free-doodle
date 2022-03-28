import * as generate from "./utils/generate";
import request from "supertest";
import app from "../src/server";

it("clears the cookie after signing out", async () => {
  const { email, password } = generate.loginForm();
  const register = request(app)
    .post("/auth/register")
    .send({ email, password })
    .expect(200);

  const response = await request(app).delete("/auth/logout").expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "ACCESS_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
});
