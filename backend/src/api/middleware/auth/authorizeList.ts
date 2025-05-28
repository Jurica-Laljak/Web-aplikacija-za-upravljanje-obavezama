import { NextFunction, Request, Response } from "express";
import { AuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/AuthorizedAttributes";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import { ToDoList } from "../../../interfaces/list/ToDoList";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";

export function authorizeList<R = any>(paramName: string) {
  return async function (
    req: Request,
    res: Response<R, AuthorizedAttributes>,
    next: NextFunction
  ) {
    var listId = req.params[paramName];
    // querying the database
    try {
      var sqlRes = await query<ToDoList>(
        selectAllConditionally(
          "todolist",
          ["userid", res.locals.userId],
          ["listid", listId]
        )
      );
    } catch (err) {
      console.log(err);
      next(ErrorEnvelope.databaseError());
      return;
    }
    // if result is empty, user isn't authorized to access the list
    if (sqlRes.rows.length == 0) {
      next(ErrorEnvelope.authorizationError("list"));
      return;
    } else {
      // otherwise, continue processing the request
      res.locals.listid = listId;
      next();
    }
  };
}
