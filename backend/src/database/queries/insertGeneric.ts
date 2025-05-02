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
  records: T[],
  returningString: string = ""
): string {
  if (returningString != "") {
    if (records.length > 1) {
      throw new Error("insert()|Records must not be an array");
    }
    return `INSERT INTO ${tableName} (${Object.keys(records[0]).join(
      ", "
    )}) VALUES ('${Object.values(records[0]).join(
      "', '"
    )}') RETURNING ${returningString};\n`;
  }
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
