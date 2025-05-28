import { NextFunction, Request, Response } from "express";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { GroupAuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/GroupAuthorizedAttributes";
import { ToDoGroup } from "../../../interfaces/group/ToDoGroup";

export function authorizeGroup<R = any>(paramName: string) {
  return async function (
    req: Request,
    res: Response<R, GroupAuthorizedAttributes>,
    next: NextFunction
  ) {
    var groupId = req.params[paramName];
    // querying the database
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
    } else {
      // otherwise, continue processing the request
      res.locals.groupid = groupId;
      next();
    }
  };
}
