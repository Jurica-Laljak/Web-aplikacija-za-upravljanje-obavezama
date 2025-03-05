import express from "express";
import apiRouter from "./api/apiRouter";
import https from "https";
import fs from "fs";
import pool from "./database/pool";

const PORT = 3000;
const app = express();

//creating secure server
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });

pool.query(`SELECT * FROM "Test"`);

//home route
app.get("/", (req, res) => {
  res.send("Hello world");
});

//API router
app.use("/api", apiRouter);
