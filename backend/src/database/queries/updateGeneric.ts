import { Condition } from "../../interfaces/enum/Condition";

/**
 * Generate UPDATE statement for given object
 * @param tableName name of the relation
 * @param object item that must be added
 * @param condition on which the SQL query will be executed
 * @param returningAttribute attribute that must be returned from database
 * @returns {string} SQL query
 */
export function update<U extends Object>(
  tableName: string,
  object: U,
  condition: Condition,
  returningAttribute: string = ""
): string {
  // define set of keys and values
  var keys = Object.keys(object).map((k) => k.toLowerCase());
  var values = Object.values(object);

  if (keys.length > 1) {
    // if object has more than one attribute, parentheses are added
    var sqlQuery = `UPDATE ${tableName} 
    SET (${keys.join(", ")}) = ('${values.join("', '")}')`;
  } else {
    // ..length == 1
    var sqlQuery = `UPDATE ${tableName} 
  SET ${keys[0]} = '${values[0]}'`;
  }

  // specify primary key value
  sqlQuery += `
  WHERE ${tableName}.${condition[0]} = '${condition[1]}'`;

  // append RETURNING statement if needed
  if (returningAttribute != "") {
    sqlQuery += `
    RETURNING ${returningAttribute}`;
  }
  return sqlQuery + ";\n";
}
