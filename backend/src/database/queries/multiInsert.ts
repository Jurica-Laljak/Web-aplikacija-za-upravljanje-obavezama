export function multiInsert<I extends Object>(
  tableName: string,
  records: I[]
): string {
  // define set of keys and values
  var keys = Object.keys(records[0]).map((k) => k.toLowerCase());

  var sqlQuery = `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES `;
  var init = false;
  for (let record of records) {
    var values = Object.values(record);

    // process values of current record
    for (let i in values) {
      if (values[i].toString() == "") {
        // null
        values[i] = "NULL";
      } else {
        // not null
        values[i] = `'${values[i]}'`;
      }
    }

    // add commas between entries
    if (init) {
      sqlQuery += ",\n";
    } else {
      init = true;
    }

    // add processed entry
    sqlQuery += `(${values.join(", ")})`;
  }

  return sqlQuery + ";\n";
}
