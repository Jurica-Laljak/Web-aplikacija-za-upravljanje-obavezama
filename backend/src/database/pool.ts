import { Pool } from "pg";
import fs from "fs";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "111111lol",
  database: "Web-aplikacija-za-upravljanje-obavezama",
});

console.log("Database connection success");

export = pool;
