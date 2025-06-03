import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { ToDoListDto } from "../../../../../shared/list/ToDoList.dto";
import { AuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/AuthorizedAttributes";
import query from "../../../database/query";
import { ToDoList } from "../../../interfaces/list/ToDoList";
import { ToDoDto } from "../../../../../shared/todo/ToDo.dto";
import { GroupDto } from "../../../../../shared/group/Group.dto";

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
  var queryStr1 = `SELECT todolist.userid,
  todolist.listid,
  todolist.name,
  todolist.highlevelsort::text,
  todolist.midlevelsort::text,
  todolist.lowlevelsort::text,
	CASE
			WHEN NOT EXISTS (SELECT t2.todoid
				FROM todo AS t2
				WHERE t2.listid = ${res.locals.listid}
			) THEN '[]'
			ELSE json_agg(DISTINCT jsonb_build_object(
			'listid', todo.listid,
			'todoid', todo.todoid,
            'contents', todo.content,
            'duedate', todo.duedate,
            'priority', todo.priority,
            'groupid', todo.groupid,
			'timecreated', todo.timecreated
		  )) 
  END AS todos
	FROM todolist LEFT OUTER JOIN todo
		ON todolist.listid = todo.listid
	WHERE todolist.listid = ${res.locals.listid}
	GROUP BY todolist.listid;`;

  try {
    var lists = await query<ToDoList & { todos: ToDoDto[] }>(queryStr1);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  console.log("Lol!");

  console.log(`List:
    ${JSON.stringify([...lists][0])}
    `);

  var list = [...lists][0];

  var queryStr2 = `SELECT todogroup.*,
	CASE
		WHEN NOT EXISTS (SELECT gd2.filterid
			FROM groupdefined AS gd2
			WHERE gd2.groupid = todogroup.groupid
		) THEN '[]'
	ELSE json_agg(DISTINCT groupdefined.filterid)
	END as filterIds,
	CASE
		WHEN NOT EXISTS (SELECT t2.todoid
			FROM todo AS t2
			WHERE t2.groupid = todogroup.groupid
		) THEN '[]'
	ELSE json_agg(DISTINCT todo.todoid)
	END as toDoIds
	
	FROM todogroup LEFT OUTER JOIN groupdefined
		ON todogroup.groupid = groupdefined.groupid
			LEFT OUTER JOIN todo
				ON todogroup.groupid = todo.groupid
				
	WHERE todogroup.listid = ${res.locals.listid}
	
	GROUP BY todogroup.groupid`;

  try {
    var groups = await query<GroupDto>(queryStr2);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  console.log(`Groups:
    ${JSON.stringify([...groups])}
    `);

  var retObj = Object.assign({}, list, { groups: [...groups] });
  res.send(retObj);
}
