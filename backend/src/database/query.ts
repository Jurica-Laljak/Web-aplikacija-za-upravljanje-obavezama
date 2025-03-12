import pool from "./pool";

export = async function query(text: string, values?: any[]): Promise<Object[]> {
  let queryJson = (await pool.query(text, values)).rows;
  console.log(queryJson);
  return queryJson;
};
