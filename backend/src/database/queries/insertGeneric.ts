import { returning } from "./commonElements";

/**
 * Generate INSERT statement for given collection
 * Cannot properly insert byte array objects
 * @param tableName name of the relation
 * @param record item that must be added
 * @returns {string} joined
 */
export function insert<T extends Object>(
  tableName: string,
  record: T,
  returningAttribute: string = ""
): string {
  return `INSERT INTO ${tableName} (${Object.keys(record).join(
    ", "
  )}) VALUES ('${Object.values(record).join(
    "', '"
  )}') RETURNING ${returningAttribute};\n`;
}
