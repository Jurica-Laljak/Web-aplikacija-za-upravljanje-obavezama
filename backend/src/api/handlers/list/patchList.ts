import { Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function patchList(
  req: Request,
  res: Response<{}, TokenAttributes>
) {}
