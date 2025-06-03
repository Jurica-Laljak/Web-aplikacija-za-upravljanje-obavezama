import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { insert } from "../../../database/queries/insertGeneric";
import { ToDoInsert } from "../../../interfaces/todo/ToDoInsert";
import { ToDoDto } from "../../../../../shared/todo/ToDo.dto";
import { AuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/AuthorizedAttributes";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import { Condition } from "../../../interfaces/type/Condition";
import { Filter } from "../../../interfaces/filter/Filter";
import { ToDo } from "../../../interfaces/todo/ToDo";
import anonymousQuery from "../../../database/anonymousQuery";
import { multiInsert } from "../../../database/queries/multiInsert";
import { ownsPrefixes } from "./helper/ownsPrefixes";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function postTodo(
  req: Request,
  res: Response<ToDoDto, AuthorizedAttributes>,
  next: NextFunction
) {
  if (req.body.prefixes === undefined) {
    var remainingBody = req.body;
  } else {
    var { prefixes, ...remainingBody } = req.body;

    // validate if user has right to access prefixes
    var valid = await ownsPrefixes(res.locals.userId, prefixes);

    console.log(valid);
    if (!valid) {
      // prefixes are not valid
      next(ErrorEnvelope.authorizationError("filter"));
      return;
    }
  }

  // validate request body and create SQL query
  try {
    var insertObj = { ...remainingBody, listid: res.locals.listid };
    var queryStr = insert<ToDoInsert & { listid: number }>(
      "todo",
      insertObj,
      "*"
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  // insert todo into relation todo
  try {
    var todo = await query<ToDo>(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }
  var returnVal = [...todo];

  if (!(req.body.prefixes === undefined)) {
    var todoId = returnVal[0].todoid;

    // multi-insert entries to todoassociates
    // table for all provided prefixes
    var records: { todoid: number; filterid: string }[] = [];
    for (let pID of prefixes) {
      records.push({ todoid: todoId, filterid: pID });
    }
    queryStr = multiInsert<{ todoid: number; filterid: string }>(
      "todoassociates",
      records
    );

    console.log(queryStr);

    try {
      await anonymousQuery(queryStr);
    } catch (err) {
      console.log(err);
      next(ErrorEnvelope.validationError());
      return;
    }
  }

  // return ToDoDto
  res.send(returnVal[0]);
}
