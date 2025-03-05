import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "111111lol",
  database: "Web-aplikacija-za-upravljanje-obavezama",
});

export = pool;
