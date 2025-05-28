import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { ToDoDto } from "../../../../../shared/todo/ToDo.dto";
import { GroupAuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/GroupAuthorizedAttributes";
import anonymousQuery from "../../../database/anonymousQuery";
import { delete_ } from "../../../database/queries/deleteGeneric";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteGroup(
  req: Request,
  res: Response<ToDoDto, GroupAuthorizedAttributes>,
  next: NextFunction
) {
  // delete given group
  var queryStr = delete_("todogroup", ["groupid", res.locals.groupid]);
  try {
    var result = await anonymousQuery(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  if (result.status && result.status.split(" ").pop() == "0") {
    // operation failed
    next(ErrorEnvelope.recordMissingError("group"));
    return;
  } else {
    // operation succeded
    res.send();
  }
}
