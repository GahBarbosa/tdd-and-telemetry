import { initializeTracing } from "./tracing.js";
await initializeTracing();
import { config } from "dotenv";
config();

import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

import AuthRoutes from "./routes/auth.js";
import SessionRoutes from "./routes/session.js";

const fastify = Fastify();
fastify.register(fastifyJwt, {
  secret: process.env.APP_SECRET,
});

const isTestEnv = process.env.NODE_ENV === "test";

if (!isTestEnv && !process.env.DB_NAME) {
  console.error("[error*****]: please, pass DB_NAME env before running it!");
  process.exit(1);
}

fastify.register(AuthRoutes);
fastify.register(SessionRoutes);

export const app = fastify;
