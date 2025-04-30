import { ResultIterator, ResultRecord } from "ts-postgres";
import { ErrorEnvelope } from "../interfaces/other/ErrorEnvelope";
import { client } from "./connectToDb";

export = async function anonymousQuery(
  text: string,
  values?: any[]
): Promise<ResultIterator<ResultRecord<any>>> {
  try {
    let result = client().query(text, values);
    return result;
  } catch (err) {
    console.log(err);
    throw new ErrorEnvelope("Database error", 500);
  }
};
