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
 * @param column name of the column in which the value is matched
 * @param value value with which records are compared
 * @returns {string}
 */
export function selectAllConditionally(
  tableName: string,
  column: string,
  value: string
): string {
  var retString = `SELECT * FROM ${tableName} WHERE ${tableName}.${column} `;
  return `SELECT * FROM ${tableName} WHERE ${tableName}.${column} = '${value}'`;
}
