
-- get list description, all containing groups and ungrouped todos
SELECT todolist.userid,
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
			'isarchived', todo.isarchived,
            'serialnumber', todo.serialnumber
        )) AS todos
	FROM todolist LEFT OUTER JOIN todogroup
		ON todolist.listid = todogroup.listid
            LEFT OUTER JOIN todo
                ON todolist.listid = todo.listid
	WHERE todolist.listid = '4' AND todo.isarchived = 'False'
		AND todo.groupid IS NULL
	GROUP BY todolist.listid;

-- get all group filters and containing todos
SELECT todogroup.groupid,
	json_agg(DISTINCT groupdefined.filterid) AS filters,
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
			'isarchived', todo.isarchived,
            'serialnumber', todo.serialnumber
    )) AS todos

	FROM todogroup LEFT OUTER JOIN groupdefined
		ON todogroup.groupid = groupdefined.groupid
			LEFT OUTER JOIN todo
				ON todogroup.groupid = todo.groupid

	WHERE todogroup.listid = '4' AND todo.isarchived = 'False'

	GROUP BY todogroup.groupid

-- get all prefixes for todos
SELECT todo.todoid,
	json_agg(DISTINCT todoassociates.filterid) AS prefixes

	FROM todo LEFT OUTER JOIN todoassociates
		ON todo.todoid = todoassociates.todoid

	WHERE todo.listid = '4' AND todo.isarchived = 'False'

	GROUP BY todo.todoid
