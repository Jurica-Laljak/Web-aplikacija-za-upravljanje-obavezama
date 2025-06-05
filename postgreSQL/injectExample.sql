-- update todolist

UPDATE todolist SET highlevelsort = 'priority:desc';

UPDATE todolist SET midlevelsort = 'duedate:desc';

UPDATE todolist SET lowlevelsort = 'timecreated:asc';

-- create todogroups

INSERT INTO todogroup (listid, name, serialnumber) VALUES (1, 'Progi', 1);

INSERT INTO todogroup (listid, name, serialnumber) VALUES (1, 'Ppj', 2);

INSERT INTO todogroup (listid, name, serialnumber) VALUES (1, 'Vikend', 3);

-- create todos

INSERT INTO todo (listid, content, duedate, priority, groupid) VALUES (1, 'Očistiti kuhinju', NULL, 2, 3);

INSERT INTO todo (listid, content, duedate, priority) VALUES (1, 'Progi - 10. predavanje', '2025-01-07', 2);

INSERT INTO todo (listid, content, duedate, priority) VALUES (1, 'Ppj - 3. Laboratorijska vježba', '2025-01-12', 5);

INSERT INTO todo (listid, content, duedate, priority) VALUES (1, 'Progi projekt - UML dijagram stanja', NULL, 2);

INSERT INTO todo (listid, content, duedate, priority) VALUES (1, 'Projekt - 4. sastanak', '2025-01-11', 4);

INSERT INTO todo (listid, content, duedate, priority) VALUES (1, 'Progi projekt - UML dijagram aktivnosti', NULL, 2);

-- create filters

INSERT INTO filter (userid, name) VALUES (1, 'Programsko inženjerstvo');

INSERT INTO filter (userid, name) VALUES (1, 'Prevođenje programskih jezika');

INSERT INTO filter (userid, name) VALUES (1, 'Mala grupa');

INSERT INTO filter (userid, name) VALUES (1, 'Visoki prioritet');

INSERT INTO filter (userid, name) VALUES (1, 'Vikend');

INSERT INTO prefixfilter (filterid, prefix) VALUES (1, 'progi');

INSERT INTO prefixfilter (filterid, prefix) VALUES (2, 'ppj');

INSERT INTO sizefilter (filterid, size) VALUES (3, 2);

INSERT INTO priorityfilter (filterid, lowerbound, higherbound) VALUES (4, 4, NULL);

INSERT INTO timeperiodfilter (filterid, lowerbound, higherbound) VALUES (5, 'saturday', 'sunday');

-- associate filters with todogroups

INSERT INTO groupdefined (groupid, filterid) VALUES (1, 1);

INSERT INTO groupdefined (groupid, filterid) VALUES (1, 3);

INSERT INTO groupdefined (groupid, filterid) VALUES (2, 2);

INSERT INTO groupdefined (groupid, filterid) VALUES (3, 4);

INSERT INTO groupdefined (groupid, filterid) VALUES (3, 5);