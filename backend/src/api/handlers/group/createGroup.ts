import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { insert } from "../../../database/queries/insertGeneric";
import { AuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/AuthorizedAttributes";
import { ToDoGroupInsert } from "../../../interfaces/group/ToDoGroupInsert";
import { GroupDto } from "../../../../../shared/group/Group.dto";
import { ToDoGroup } from "../../../interfaces/group/ToDoGroup";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function createGroup(
  req: Request,
  res: Response<GroupDto, AuthorizedAttributes>,
  next: NextFunction
) {
  // validate request body and create SQL query
  try {
    var insertObj = { ...req.body, listid: res.locals.listid };
    var queryStr = insert<ToDoGroupInsert & { listid: number }>(
      "todogroup",
      insertObj,
      "*"
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  // insert into group
  try {
    var result2 = await query<Required<ToDoGroup>>(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // return group id
  var rows2 = [...result2];
  res.send({ ...rows2[0], filters: [], todos: [] });
}
