import { User } from "../database/model/user.js";

export async function store(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.code(401).send({ message: "user not found" });
  }

  if (!(await user.checkPassword(password))) {
    return res.code(401).send({ message: "incorrect password" });
  }

  return res.code(200).send({ user, token: user.generateToken(user.id) });
}
