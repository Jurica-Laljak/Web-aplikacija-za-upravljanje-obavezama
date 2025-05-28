import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { GroupAuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/GroupAuthorizedAttributes";
import { delete_ } from "../../../database/queries/deleteGeneric";
import query from "../../../database/query";
import { multiInsert } from "../../../database/queries/multiInsert";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function groupDefineFilters(
  req: Request,
  res: Response<{}, GroupAuthorizedAttributes>,
  next: NextFunction
) {
  if (req.body.filters === undefined) {
    next(ErrorEnvelope.validationError());
    return;
  }
  var filterIds = req.body.filters;

  // delete previous filters for group (if such exist)
  // and add given filters

  var queryStr = delete_("groupdefined", ["groupid", res.locals.groupid]);

  // query database
  try {
    await query(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // generate insert query
  var records: { filterid: string; groupid: string }[] = [];
  for (let fID of filterIds) {
    records.push({ filterid: fID, groupid: res.locals.groupid });
  }
  queryStr = multiInsert<{ filterid: string; groupid: string }>(
    "groupdefined",
    records
  );

  // query database
  try {
    await query(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  res.send();
}
