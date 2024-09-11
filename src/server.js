import { app } from "./app.js";

const server = await app.listen({
  port: process.env.APP_PORT || 9999,
  host: "127.0.0.1",
});

console.log(`server is running at ${server}`);
