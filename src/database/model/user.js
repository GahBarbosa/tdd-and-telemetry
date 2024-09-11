import { DataTypes } from "sequelize";
import { sequelize } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const User = sequelize.define(
  "User",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
  },
  {
    tableName: "users",
    hooks: {
      beforeSave: async (user) => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
      },
    },
  }
);

User.prototype.checkPassword = function (password) {
  return bcrypt.compare(password, this.password_hash);
};

User.prototype.generateToken = function (id) {
  return jwt.sign({ id: id }, process.env.APP_SECRET);
};
