import { config } from "dotenv";
config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
    storage: "./__tests__/database.sqlite",
    define: { underscored: true, timestamps: true },
  }
);
console.log(
  process.env.NODE_ENV
    ? "connect to database using test environment."
    : "connect to database using development environment"
);
