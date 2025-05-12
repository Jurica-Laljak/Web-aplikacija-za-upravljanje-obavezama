import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { ToDoDto } from "../../../dtos/todo/ToDo.dto";
import { AuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/AuthorizedAttributes";
import { delete_ } from "../../../database/queries/deleteGeneric";
import anonymousQuery from "../../../database/anonymousQuery";
import { ToDoAuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/ToDoAuthorizedAttributes";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteTodo(
  req: Request,
  res: Response<ToDoDto, ToDoAuthorizedAttributes>,
  next: NextFunction
) {
  // delete given todo
  var queryStr = delete_("todo", ["todoid", res.locals.todoid]);
  console.log(queryStr);
  try {
    var result = await anonymousQuery(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  console.log("status:", result.status);
  if (result.status && result.status.split(" ").pop() == "0") {
    // operation failed => todo doesn't exist
    next(ErrorEnvelope.recordMissingError("todo"));
    return;
  } else {
    // operation succeded
    res.send();
  }
}
