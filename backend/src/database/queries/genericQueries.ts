export var returning: string = "  RETURNING *;";

export function getAll(tableName: string): string {
  return `SELECT * FROM ${tableName}`;
}

export function getAllConditionally(
  tableName: string,
  columnName: string,
  value: string | number
): string {
  return `SELECT * FROM ${tableName} WHERE ${tableName}.${columnName} == '${value}'`;
}
