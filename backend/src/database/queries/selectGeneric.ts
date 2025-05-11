import { Condition } from "../../interfaces/type/Condition";

/**
 * Generate SELECT statement for given relation
 * @param tableName name of the relation
 * @param attributes attributes that will be read
 * @param attributeTypeMap map that specifies types for specific attributes (not all)
 * @param conditions array of conditions that are added to WHERE statement
 * @returns {string} SQL query
 */
export function select(
  tableInfo: {
    tableName: string;
    primaryKey: string;
    attributes: string[];
    attributeTypeMap: Map<string, string>;
  }[],
  unionTables: [string, string][] | undefined,
  ...conditions: Condition[]
): string {
  var sqlQuery = "SELECT ";
  var init: boolean = false;

  // SELECT statement
  for (let table of tableInfo) {
    for (let attr of table.attributes) {
      if (init) {
        sqlQuery += ",\n";
      } else {
        init = true;
      }

      let type = table.attributeTypeMap.get(attr)?.toLowerCase();
      if (type) {
        if (type == "date") {
          sqlQuery += `DATE(${table.tableName}.${attr})::text AS ${attr}`;
        } else if (type == "boolean" || type == "bool") {
          sqlQuery += `CASE
					WHEN ${table.tableName}.${attr} = TRUE THEN 'true'
					ELSE 'false'
				END AS ${attr}`;
        } else {
          sqlQuery += `${table.tableName}.${attr}`;
        }
      }
    }
  }

  // FROM statement
  sqlQuery += "\nFROM ";
  if (unionTables) {
    var init = false;
    for (let unionPair of unionTables) {
    }
    sqlQuery += `\nFROM ${tableName} JOIN ${unionTableName}
    ON ${tableName}.${primaryKey} = ${tableName}.${primaryKey}`;
  } else {
    sqlQuery += `\nFROM ${tableInfo[0].tableName}\n`;
  }

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
