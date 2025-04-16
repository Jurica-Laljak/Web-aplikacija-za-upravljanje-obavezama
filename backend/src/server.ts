import express from "express";
import apiRouter from "./api/routes/apiRouter";
import jwt from "jsonwebtoken";
import https from "https";
import { verifyJWT } from "./api/middleware/authMiddleware";
import fs from "fs";
import { header } from "express-validator";

const PORT = 3000;
const app = express();

//body parser
app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

// creating secure server
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

//Home route
app.get("/", (req, res) => {
  res.send("Hello world.");
});

//API router
app.use(
  "/api",
  header("Authorization").notEmpty().withMessage("No JWT provided."),
  verifyJWT,
  apiRouter
);

//error handler
app.use((err, req, res) => {});
