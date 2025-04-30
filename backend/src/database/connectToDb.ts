import { Client, connect } from "ts-postgres";
import config from "../config";
import fs from "fs";

var storedConnection: Client;

export async function connectToDb() {
  const client = await connect({
    host: "localhost",
    port: 5432,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: "Web-aplikacija-za-upravljanje-obavezama",
  });

  console.log("Database connection success");
  storedConnection = client;
}

export function client() {
  return storedConnection;
}
