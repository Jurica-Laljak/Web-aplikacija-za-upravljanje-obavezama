import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { ToDoListDto } from "../../../dtos/list/ToDoList.dto";
import { AuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/AuthorizedAttributes";

import query from "../../../database/query";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getListAndContents(
  req: Request,
  res: Response<ToDoListDto, AuthorizedAttributes>,
  next: NextFunction
) {
  var queryStr = `SELECT todolist.userid,
        todolist.listid,
		todolist.name,
		todolist.serialnumber,
		todolist.highlevelsort,
		todolist.midlevelsort,
		todolist.lowlevelsort,
		todolist.defaultgroupid,
		todolist.timecreated,
		json_agg(DISTINCT jsonb_build_object(
            'listid', todogroup.listid,
			'groupid', todogroup.groupid,
			'name', todogroup.name,
			'highlevelsort', todogroup.highlevelsort,
			'midlevelsort', todogroup.midlevelsort,
			'lowlevelsort', todogroup.lowlevelsort,
			'timecreated', todogroup.timecreated,
			'serialnumber', todogroup.serialnumber
		)) AS groups,
        json_agg(DISTINCT jsonb_build_object(
            'listid', todo.listid,
            'todoid', todo.todoid,
            'contents', todo.content,
            'duedate', todo.duedate,
            'issuedate', todo.issuedate,
            'depth', todo.depth,
            'priority', todo.priority,
            'groupid', todo.groupid,
            'parenttodoid', todo.parenttodoid,
            'serialnumber', todo.serialnumber
        )) AS todos
	FROM todolist LEFT OUTER JOIN todogroup
		ON todolist.listid = todogroup.listid
            LEFT OUTER JOIN todo
                ON todolist.listid = todo.listid
	WHERE todolist.listid = '${res.locals.listid}'
	GROUP BY todolist.listid;`;

  try {
    var lists = await query<ToDoListDto>(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  res.send([...lists][0]);
}
