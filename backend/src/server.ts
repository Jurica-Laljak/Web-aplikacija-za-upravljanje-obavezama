import express, { NextFunction, Request, Response } from "express";
import apiRouter from "./api/routes/apiRouter";
import cookieParser from "cookie-parser";
import { ErrorEnvelope } from "./interfaces/other/ErrorEnvelope";
import config from "./config";
import { connectToDb } from "./database/connectToDb";
import { test } from "./test";
import { readFileSync } from "fs";
import { createServer } from "https";
import { logger } from "./api/middleware/other/logger";
import { log } from "console";

async function run() {
  const PORT = 3000;
  const app = express();

  //include middleware
  app.use(express.json()); //json handling
  var bodyParser = require("body-parser");
  app.use(bodyParser.json()); //parser for json bodies
  app.use(cookieParser(config.COOKIE_KEY)); //cookie parser

  // enabling CORS
  var cors = require("cors"); // enable CORS
  const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    // preflightContinue: true,
    // allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));

  //API router
  app.use("/api", apiRouter);

  //error handler
  app.use(
    (err: ErrorEnvelope, req: Request, res: Response, next: NextFunction) => {
      err.errorCode ? res.status(err.errorCode) : res.status(500); //set status

      if (err.headers) {
        // setting additional headers
        res.setHeaders(err.headers);
      }

      //sending response
      if (err.redirect) {
        res.send({ message: err.message, redirect: err.redirect });
        return;
      } else {
        res.send({ message: err.message });
      }
    }
  );

  await connectToDb(); //database connection

  // starting server
  app.listen(PORT, () => {
    console.log(`HTTP server started on ${PORT}`);
  });

  // starting secure server
  // createServer(
  //   {
  //     key: readFileSync("key.pem"),
  //     cert: readFileSync("cert.pem"),
  //   },
  //   app
  // ).listen(PORT, () => {
  //   console.log(`HTTPS server started on ${PORT}`);
  // });
}

run(); // run server
test(); // TO-DO remove
