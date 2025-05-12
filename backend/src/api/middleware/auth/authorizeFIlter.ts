import { NextFunction, Request, Response } from "express";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { ToDoGroup } from "../../../interfaces/group/ToDoGroup";
import { FilterAuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/FilterAuthorizedAttributes";

export function authorizeFilter<R = any>(paramName: string) {
  return async function (
    req: Request,
    res: Response<R, FilterAuthorizedAttributes>,
    next: NextFunction
  ) {
    var filterId = req.params[paramName];
    // querying the database
    try {
      var sqlRes = await query<ToDoGroup>(
        selectAllConditionally(
          "prefixfilter",
          ["userid", res.locals.userId],
          ["filterid", filterId]
        )
      );
    } catch (err) {
      console.log(err);
      next(ErrorEnvelope.databaseError());
      return;
    }
    // if result is empty, user isn't authorized to access the group
    if (sqlRes.rows.length == 0) {
      next(ErrorEnvelope.authorizationError("filter"));
      return;
    } else {
      // otherwise, continue processing the request
      res.locals.filterid = filterId;
      next();
    }
  };
}
