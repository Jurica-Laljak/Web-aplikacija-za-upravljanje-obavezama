import { returning } from "./commonElements";

/**
 * Generate INSERT statement for given collection
 * Cannot properly insert byte array objects
 * @param tableName name of the relation
 * @param records collection of
 * @returns {string} joined
 */
export function insert<T extends Object>(
  tableName: string,
  records: T[]
): string {
  var retString = "";
  var header = `INSERT INTO ${tableName}`;
  records.forEach((el) => {
    retString += `${header} (${Object.keys(records[0]).join(
      ", "
    )}) VALUES ('${Object.values(el).join("', '")}');\n`;
  });
  console.log(retString);

  return retString;
}
