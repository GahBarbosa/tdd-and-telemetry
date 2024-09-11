import { User } from "../../src/database/model/user";
import bcrypt from "bcryptjs";
import truncate from "../utils/truncate";

describe("User Unit", () => {
  beforeAll(async () => {
    await truncate();
  });

  it("encrypt password", async () => {
    const user = await User.create({
      name: "Gabriel",
      email: "gahbarbosa7@gmail.com",
      password: "123456",
    });
    const compareHash = await bcrypt.compare("123456", user.password_hash);

    expect(compareHash).toBe(true);
  });
});
