import { Request, Response } from "express";
import query from "../../../database/query";
import ToDo from "../../../interfaces/list/ToDo";

/**
 * Insert todos into the database
 * @param req
 * @param res
 * @returns
 */
export async function insertTodos(
  req: Request<{}, {}, ToDo[]>,
  res: Response
) {}
