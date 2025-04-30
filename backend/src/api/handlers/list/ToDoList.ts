import { Request, Response } from "express";
import query from "../../../database/query";
import {
  selectAll,
  selectAllConditionaly,
} from "../../../database/queries/selectAll";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";

/**
 * Get the user list with id, along with its contents
 * @param req
 * @param res
 * @returns
 */
export async function getLists(req: Request, res: Response) {
  var result = await query(selectAll("todolist"));
  res.send(result);
  return;
}

/**
 * Get all user lists, along with their contents
 * @param req
 * @param res
 * @returns
 */
export async function getList(
  req: Request<{ id: number }, {}, {}>,
  res: Response
) {
  var resultList = await query(
    getAllConditionally("todolist", "listid", req.params.id)
  );

  if (resultList.length > 0) {
    // request successful
    var resultItems = await query(
      getAllConditionally("todolistitem", "listid", req.params.id)
    );
    res.send(resultList);
    return;
  } else {
    //request unsuccessful
    throw new ErrorEnvelope(`No list with id ${req.params.id}`);
  }
}

export async function putList(req: Request, res: Response) {}
