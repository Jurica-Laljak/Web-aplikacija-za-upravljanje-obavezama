import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { AuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/AuthorizedAttributes";
import { delete_ } from "../../../database/queries/deleteGeneric";
import anonymousQuery from "../../../database/anonymousQuery";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteList(
  req: Request,
  res: Response<{}, AuthorizedAttributes>,
  next: NextFunction
) {
  var queryStr = delete_("todolist", ["listid", res.locals.listid]);
  console.log(queryStr);
  try {
    var result = await anonymousQuery(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  if (result.status && result.status.split(" ").pop() == "0") {
    next(ErrorEnvelope.recordMissingError("todo"));
    return;
  } else {
    res.send();
  }
}
