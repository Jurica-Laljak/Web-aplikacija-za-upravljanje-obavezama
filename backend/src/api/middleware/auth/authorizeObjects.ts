import { NextFunction, Request, Response } from "express";
import { AuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/AuthorizedAttributes";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import ToDoList from "../../../interfaces/list/ToDoList";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";

export function authorizeObjects<R = any>(
  topLevelParam: string,
  otherParams: string[]
) {
  return async function (
    req: Request,
    res: Response<R, TokenAttributes>,
    next: NextFunction
  ) {
    // querying the database
    try {
      var sqlRes = await query<ToDoList>(
        `SELECT * FROM 

          `
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
    // if result is empty, user isn't authorized to access the object
    if (sqlRes.rows.length == 0) {
      next(ErrorEnvelope.authorizationError());
      return;
    } else {
      // otherwise, continue processing the request
      next();
    }
  };
}
