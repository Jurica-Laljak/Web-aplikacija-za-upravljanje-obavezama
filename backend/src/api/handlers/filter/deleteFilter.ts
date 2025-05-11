import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { FilterAuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/FilterAuthorizedAttributes";
import { delete_ } from "../../../database/queries/deleteGeneric";
import anonymousQuery from "../../../database/anonymousQuery";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteFilter(
  req: Request,
  res: Response<{}, FilterAuthorizedAttributes>,
  next: NextFunction
) {
  // create DELETE statement
  var queryStr = delete_("filter", ["filterid", res.locals.filterid]);
  try {
    // delete given filter
    var result = await anonymousQuery(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  if (result.status && result.status.split(" ").pop() == "0") {
    // operation failed
    next(ErrorEnvelope.recordMissingError("filter"));
    return;
  } else {
    // operation succeded
    res.send();
  }
}
