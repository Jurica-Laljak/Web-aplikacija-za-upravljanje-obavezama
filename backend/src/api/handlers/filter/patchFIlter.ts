import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { FilterAuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/FilterAuthorizedAttributes";
import { update } from "../../../database/queries/updateGeneric";
import { Filter } from "../../../interfaces/filter/Filter";
import { FilterInsert } from "../../../interfaces/filter/FilterInsert";
import anonymousQuery from "../../../database/anonymousQuery";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function patchFilter(
  req: Request<{}, {}, Partial<FilterInsert>>,
  res: Response<{}, FilterAuthorizedAttributes>,
  next: NextFunction
) {
  var { type, ...updateObj } = req.body; // remove type from update object

  if (!type) {
    next(ErrorEnvelope.validationError());
    return;
  }

  try {
    console.log(Object.keys(updateObj));
    console.log(Object.values(updateObj));
    var queryStr = update<Partial<Filter>>(type, updateObj, [
      "filterid",
      res.locals.filterid,
    ]);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  // update group data
  try {
    await anonymousQuery(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  res.send();
}
