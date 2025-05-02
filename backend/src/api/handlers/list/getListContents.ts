import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import ToDoList from "../../../interfaces/list/ToDoList";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import { ToDoListDto } from "../../../dtos/list/ToDoList.dto";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getListContents(
  req: Request,
  res: Response<ToDoListDto[], TokenAttributes>,
  next: NextFunction
) {
  var id = Number(req.params.id);
  try {
    var result = await query<ToDoList>(
      selectAllConditionally("todolist", ["userid", 1], ["listid", id])
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }
  var rows = [...result];
  for (let i of result) {
    for (let j of Object.keys(i)) {
      console.log(j, typeof j);
    }
    break;
  }
  console.log(rows);
  res.send(rows);
}
