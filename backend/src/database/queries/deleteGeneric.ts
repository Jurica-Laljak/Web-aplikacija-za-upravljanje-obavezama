import { Condition } from "../../interfaces/type/Condition";

/**
 * Generate DELETE statement for given condition
 * Cannot properly insert byte array objects
 * @param tableName name of the relation
 * @param condition on which the SQL query will be executed
 * @param returningAttribute attribute that must be returned from database
 * @returns {string} SQL query
 */
export function delete_(
  tableName: string,
  condition: Condition,
  returningAttribute: string = ""
): string {
  var sqlQuery = `DELETE FROM ${tableName}
  WHERE ${tableName}.${condition[0]} = '${condition[1]}'`;

  // append RETURNING if needed
  if (returningAttribute != "") {
    sqlQuery += ` RETURNING ${returningAttribute}`;
  }
  return sqlQuery + ";\n";
}
