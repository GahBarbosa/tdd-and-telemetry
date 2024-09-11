import { app } from "../../src/app.js";
import { User } from "../../src/database/model/user.js";
import truncate from "../utils/truncate.js";

describe("Session", () => {
  beforeAll(async () => {
    await truncate();
  });

  it("create a user", async () => {
    const user = await User.create({
      name: "Gabriel Barbosa",
      email: "gahbarbosa7@gmail.com",
      password_hash: "123456",
    });

    expect(user.email).toBe("gahbarbosa7@gmail.com");
  });

  it("authenticate with valid credentials", async () => {
    const user = await User.create({
      name: "Rodolfo Theodoro",
      email: "Rodolfo.Theodoro@gmail.com",
      password: "123456",
    });

    const response = await app.inject({
      method: "POST",
      url: "/sessions",
      body: {
        email: user.email,
        password: "123456",
      },
    });

    expect(response.statusCode).toBe(200);
  });

  it("not authenticate with invalid credentials", async () => {
    const user = await User.create({
      name: "Pedro Zanusso",
      email: "Pedro.zanusso@gmail.com",
      password: "123456",
    });

    const response = await app.inject({
      method: "POST",
      url: "/sessions",
      body: {
        email: user.email,
        password: "123123",
      },
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.payload).message).toBe("incorrect password");
  });

  it("return jwt token when authenticated", async () => {
    const user = await User.create({
      name: "Lari",
      email: "Lari@gmail.com",
      password: "123456",
    });

    const response = await app.inject({
      method: "POST",
      url: "/sessions",
      body: {
        email: user.email,
        password: "123456",
      },
    });

    expect(JSON.parse(response.body)).toHaveProperty("token");
  });
});
