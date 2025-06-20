import { Result, ResultIterator } from "ts-postgres";
import { client } from "./connectToDb";

export = async function query<T>(
  text: string,
  values?: any[]
): Promise<ResultIterator<T>> {
  console.log(text);
  let result = client().query<T>(text, values);
  return result;
};
