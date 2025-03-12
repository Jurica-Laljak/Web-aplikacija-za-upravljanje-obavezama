import express from "express";
import apiRouter from "./api/apiRouter";
import https from "https";
import fs from "fs";

const PORT = 3000;
const app = express();

//body parser
app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
//creating secure server
// https
//   .createServer(
//     {
//       key: fs.readFileSync("key.pem"),
//       cert: fs.readFileSync("cert.pem"),
//     },
//     app
//   )
//   .listen(PORT, () => {
//     console.log(`Server started on ${PORT}`);
//   });

//home route
app.get("/", (req, res) => {
  res.send("Hello world");
});

//API router
app.use("/api", apiRouter);

//error handler
app.use((err, req, res) => {});
