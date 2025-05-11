import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import {
  selectAll,
  selectAllConditionally,
} from "../../../database/queries/selectAll";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";
import { ToDoListDto } from "../../../dtos/list/ToDoList.dto";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllLists(
  req: Request,
  res: Response<ToDoListDto[], TokenAttributes>,
  next: NextFunction
) {
  try {
    var result = await query<ToDoListDto>(
      selectAllConditionally("todolist", ["userid", res.locals.userId])
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }
  res.send([...result]);
  return;
}
