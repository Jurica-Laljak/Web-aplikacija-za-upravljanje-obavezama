import query from "../../../../database/query";

export async function ownsPrefixes(
  userid: string | number,
  prefixes: number[]
): Promise<boolean> {
  var condition: string[] = [],
    i = 0,
    valid = false;
  for (let pID of prefixes) {
    condition[i] = `f.filterid = '${pID}'`;
    i += 1;
  }

  if (condition.length > 0) {
    var sqlQuery = await query<{ filterid: number }>(
      `SELECT f.filterid FROM filter f JOIN prefixfilter p ON f.filterid = p.filterid
            WHERE f.userid = '${userid}' AND (${condition.join(" OR ")})
          `
    );

    var prefixRows = [...sqlQuery],
      valid: boolean = false;

    console.log(prefixRows);

    // check if all provdied prefix ids are present in
    // set of users prefixes
    for (let pID of prefixes) {
      for (let prefix of prefixRows) {
        if (prefix.filterid == pID) {
          valid = true;
          break;
        }
      }
      if (valid) {
        break;
      }
    }
    return valid;
  } else {
    // no filters listed, continue
    return true;
  }
}
