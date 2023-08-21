import express from "express";
import env from "dotenv";
import { mainApp } from "./mainApp";
import { testDB } from "./config/testDB";
env.config();

const app = express();
const port: number = parseInt(process.env.APPLICATION_PORT!);
const realPort = port;

mainApp(app)
const Server = app.listen(realPort, () => {
  console.log("Server is active on port", realPort);
  testDB()
});

process.on("uncaughtException", (err) => {
  console.log("");
  console.log("Server is shutting down due to uncaught exception", err);

  process.exit(1);
});

process.on("unhandleRejection", (reason) => {
  console.log("");
  console.log("Server is shutting down due to unhandled rejection", reason);

  Server.close(() => {
    process.exit(1);
  });
});
