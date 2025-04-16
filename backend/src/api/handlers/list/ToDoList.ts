import { Request, Response } from "express";

export function getList(req: Request, res: Response) {}

export function getLists(req: Request<{ id: number }, {}, {}>, res: Response) {}

export function putList(req: Request, res: Response) {}
