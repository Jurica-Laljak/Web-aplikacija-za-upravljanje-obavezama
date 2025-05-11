import { ResultIterator, ResultRecord } from "ts-postgres";
import { ErrorEnvelope } from "../interfaces/other/ErrorEnvelope";
import { client } from "./connectToDb";

export = async function anonymousQuery(
  text: string,
  values?: any[]
): Promise<ResultIterator<ResultRecord<any>>> {
  let result = client().query(text, values);
  return result;
};
