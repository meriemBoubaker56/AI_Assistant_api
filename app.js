import express from "express";
import { Router } from "express";
import sequelize from "./database/index.js";
import login from "./routes/user.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api", login);
app.listen(port);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
