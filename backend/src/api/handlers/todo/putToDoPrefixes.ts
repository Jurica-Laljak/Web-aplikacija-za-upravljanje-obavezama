import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { ToDoAuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/ToDoAuthorizedAttributes";
import { ownsPrefixes } from "./helper/ownsPrefixes";
import { delete_ } from "../../../database/queries/deleteGeneric";
import query from "../../../database/query";
import { multiInsert } from "../../../database/queries/multiInsert";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function putToDoPrefixes(
  req: Request,
  res: Response<{}, ToDoAuthorizedAttributes>,
  next: NextFunction
) {
  var prefixes: number[],
    valid = false;

  if (req.body.prefixes === undefined) {
    next(new ErrorEnvelope("Usage: { prefixes: number[] }", 400));
    return;
  }

  // check if user has right to access prefixes
  prefixes = req.body.prefixes;
  try {
    valid = await ownsPrefixes(res.locals.userId, prefixes);
  } catch (err) {
    next(new ErrorEnvelope("Usage: { prefixes: number[] }", 400));
    return;
  }

  if (!valid) {
    next(ErrorEnvelope.authorizationError("prefix"));
  }

  // user has access, first delete all existing associated prefixes
  var queryStr = delete_("todoassociates", ["todoid", res.locals.todoid]);
  try {
    await query(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  //finally, insert all prefixes into todoassociates
  var records: { todoid: string; filterid: number }[] = [];
  for (let pID of prefixes) {
    records.push({ todoid: res.locals.todoid, filterid: pID });
  }

  queryStr = multiInsert<{ todoid: string; filterid: number }>(
    "todoassociates",
    records
  );

  try {
    await query(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  res.send();
}
