import { Result, ResultIterator } from "ts-postgres";
import { client } from "./connectToDb";

export = async function query<T>(
  text: string,
  values?: any[]
): Promise<ResultIterator<T>> {
  console.log("query()|", text);
  let result = client().query<T>(text, values);
  console.log(result);
  return result;
};
