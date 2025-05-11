import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { ToDoInsert } from "../../../interfaces/todo/ToDoInsert";
import { ToDoDto } from "../../../dtos/todo/ToDo.dto";
import { ToDoAuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/ToDoAuthorizedAttributes";
import { update } from "../../../database/queries/updateGeneric";
import { ToDoGroup } from "../../../interfaces/group/ToDoGroup";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import anonymousQuery from "../../../database/anonymousQuery";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function addToGroup(
  req: Request,
  res: Response<ToDoDto, ToDoAuthorizedAttributes>,
  next: NextFunction
) {
  var groupId = req.params.groupid;
  //verify access to given group
  try {
    var sqlRes = await query<ToDoGroup>(
      selectAllConditionally(
        "todogroup",
        ["listid", res.locals.listid],
        ["groupid", groupId]
      )
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // if result is empty, user isn't authorized to access the group
  if (sqlRes.rows.length == 0) {
    next(ErrorEnvelope.authorizationError("group"));
    return;
  }

  try {
    var updateObj = { groupid: groupId }; // change the group id of given todo
    console.log(Object.keys(updateObj));
    console.log(Object.values(updateObj));
    var queryStr = update<{ groupid: string }>("todo", updateObj, [
      "todoid",
      res.locals.todoid,
    ]);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  // update todo
  try {
    await anonymousQuery(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  res.send();
}
