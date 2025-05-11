import { Condition } from "../../interfaces/type/Condition";

/**
 * Select all records of table
 * @param tableName name of the relation
 * @returns {string}
 */
export function selectAll(tableName: string): string {
  return `SELECT * FROM ${tableName}`;
}

/**
 * Select all records of table that match provided value in given column
 * @param tableName name of the relation
 * @param conditions array of key value pairs that create the condition of the query
 * @returns {string}
 */
export function selectAllConditionally(
  tableName: string,
  ...conditions: Condition[]
): string {
  var i = 0,
    conditionsToString: string[] = [];
  for (let el in conditions) {
    conditionsToString[
      i
    ] = `${tableName}.${conditions[el][0]} = '${conditions[el][1]}'`;
    i += 1;
  }
  return `SELECT * FROM ${tableName} WHERE ${conditionsToString.join(" AND ")}`;
}
