import { Condition } from "../../interfaces/enum/Condition";

/**
 * Generate SELECT statement for given relation
 * @param tableName name of the relation
 * @param attributes attributes that will be read
 * @param attributeTypeMap map that specifies types for specific attributes (not all)
 * @param conditions array of conditions that are added to WHERE statement
 * @returns {string} SQL query
 */
export function select(
  tableName: string,
  attributes: string[],
  attributeTypeMap: Map<string, string>,
  ...conditions: Condition[]
): string {
  var sqlQuery = "SELECT ";
  var init: boolean = false;

  // SELECT statement
  for (let attr of attributes) {
    if (init) {
      sqlQuery += ",\n";
    } else {
      init = true;
    }

    let type = attributeTypeMap.get(attr)?.toLowerCase();
    if (type) {
      if (type == "date") {
        sqlQuery += `DATE(${tableName}.${attr})::text AS ${attr}`;
      } else if (type == "boolean" || type == "bool") {
        sqlQuery += `CASE
					WHEN ${tableName}.${attr} = TRUE THEN 'true'
					ELSE 'false'
				END AS ${attr}`;
      } else {
        sqlQuery += `${tableName}.${attr}`;
      }
    }
  }

  // FROM statement
  sqlQuery += `\nFROM ${tableName}\n`;

  // WHERE statement
  var conditionsToString: string[] = [];
  var i = 0;
  for (let el in conditions) {
    conditionsToString[
      i
    ] = `${tableName}.${conditions[el][0]} = '${conditions[el][1]}'`;
    i += 1;
  }

  sqlQuery += `WHERE ${conditionsToString.join(" AND \n")}\n;`;

  console.log("select()|", sqlQuery);
  return sqlQuery;
}
