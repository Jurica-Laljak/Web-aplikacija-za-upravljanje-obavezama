import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteList(
  req: Request,
  res: Response,
  next: NextFunction
) {}
