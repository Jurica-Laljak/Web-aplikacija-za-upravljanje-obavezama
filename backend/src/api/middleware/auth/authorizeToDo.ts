import { NextFunction, Request, Response } from "express";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import ToDo from "../../../interfaces/todo/ToDov1";
import { ToDoAuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/ToDoAuthorizedAttributes";

export function authorizeToDo<R = any>(paramName: string) {
  return async function (
    req: Request,
    res: Response<R, ToDoAuthorizedAttributes>,
    next: NextFunction
  ) {
    var toDoId = req.params[paramName];
    // querying the database
    try {
      var sqlRes = await query<ToDo>(
        selectAllConditionally(
          "todo",
          ["listid", res.locals.listid],
          ["todoid", toDoId]
        )
      );
    } catch (err) {
      console.log(err);
      next(ErrorEnvelope.databaseError());
      return;
    }
    // if result is empty, user isn't authorized to access the group
    if (sqlRes.rows.length == 0) {
      next(ErrorEnvelope.authorizationError("todo"));
      return;
    } else {
      // otherwise, continue processing the request
      res.locals.todoid = toDoId;
      next();
    }
  };
}
