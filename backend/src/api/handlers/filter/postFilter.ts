import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { insert } from "../../../database/queries/insertGeneric";
import { FilterDto } from "../../../dtos/filter/Filter.dto";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";
import { FilterInsert } from "../../../interfaces/filter/FilterInsert";
import { Filter, FilterCore } from "../../../interfaces/filter/Filter";
import anonymousQuery from "../../../database/anonymousQuery";
import query from "../../../database/query";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function postFilter(
  req: Request<{}, {}, FilterInsert>,
  res: Response<{ filterid: number }, TokenAttributes>,
  next: NextFunction
) {
  // validate request body and create SQL query
  var { type, ...reqBody } = req.body;
  try {
    var queryStr = insert<FilterCore>(
      "filter",
      { name: reqBody.name, userid: Number(res.locals.userId) },
      "*"
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  // insert into table filter
  try {
    console.log("lol");
    var result = await query<Filter>(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  var filterId = [...result][0].filterid; // extract filterid

  var newQuery: string = "";
  switch (type) {
    case "sizefilter":
      if (reqBody.size) {
        newQuery = insert<{ filterid: number; size: number }>(type, {
          filterid: filterId,
          size: reqBody.size,
        });
      }
      break;

    case "prefixfilter":
      if (reqBody.prefix) {
        newQuery = insert<{ filterid: number; prefix: string }>(type, {
          filterid: filterId,
          prefix: reqBody.prefix,
        });
      }
      break;

    case "priorityfilter":
      if (reqBody.lowerbound || reqBody.higherbound) {
        newQuery = insert(type, {
          filterid: filterId,
          lowerbound: reqBody.lowerbound,
          higherbound: reqBody.higherbound,
        });
      }
      break;

    case "timeperiodfilter":
      if (reqBody.datetype && (reqBody.lowerbound || reqBody.higherbound)) {
        newQuery = insert(type, {
          filterid: filterId,
          lowerbound: reqBody.lowerbound,
          higherbound: reqBody.higherbound,
          datetype: reqBody.datetype,
        });
      }
      break;
  }

  console.log(newQuery);
  if (newQuery == "") {
    // params not satisfied
    next(ErrorEnvelope.validationError());
    return;
  }

  // insert into table ${type}
  try {
    await anonymousQuery(newQuery);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // return filterid
  res.send({ filterid: filterId });
}
