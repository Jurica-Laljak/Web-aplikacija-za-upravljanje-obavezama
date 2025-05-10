/**
 * Generate INSERT statement for given collection
 * Cannot properly insert byte array objects
 * @param tableName name of the relation
 * @param record item that must be added
 * @returns {string} SQL query
 */
export function insert<I extends Object>(
  tableName: string,
  record: I,
  returningAttribute: string = ""
): string {
  // define set of keys and values
  var keys = Object.keys(record).map((k) => k.toLowerCase());
  var values = Object.values(record);

  for (let i in values) {
    if (values[i].toString() == "") {
      // null
      values[i] = "NULL";
    } else {
      // not null
      values[i] = `'${values[i]}'`;
    }
  }

  var sqlQuery = `INSERT INTO ${tableName} (${keys.join(
    ", "
  )}) VALUES (${values.join(", ")})`;
  if (returningAttribute != "") {
    sqlQuery += ` RETURNING ${returningAttribute}`;
  }
  return sqlQuery + ";\n";
}
