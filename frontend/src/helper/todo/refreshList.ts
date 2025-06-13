import { SortType } from "../../../../shared/list/SortType";
import timePeriodStringToDOW from "../../data/timePeriodStringToDOW";
import { FilterInternal } from "../../types/filter/FilterInternal";
import { GroupInternal } from "../../types/group/GroupInternal";
import RefreshListArgs from "../../types/list/RefreshListArgs";
import { ToDoInternal } from "../../types/todo/ToDoInternal";
import {
  assertIsPrefixFilter,
  assertIsPriorityFilter,
  assertIsSizeFilter,
  assertIsTimeperiodFilter,
} from "../filter/assertFilter";
import { sortGroups } from "../group/sortGroups";
import { sortToDos } from "./sortTodos";

export function refreshList(args: RefreshListArgs): {
  todos: ToDoInternal[];
  groups: GroupInternal[];
} {
  // alert(`Provided args: ${JSON.stringify(args)}`);

  var refreshedTodos = [...args.todos];

  // alert(`Initial: ${JSON.stringify(refreshedTodos)}`);

  // sort todos based on sort preferences
  refreshedTodos = refreshedTodos.sort((a, b) => {
    // high level sort
    // if ((a.todoid == 4 || a.todoid == 6) && (b.todoid == 4 || b.todoid == 6)) {
    //   alert(`a, b = ${JSON.stringify(a.todoid)}, ${JSON.stringify(b.todoid)}`);
    // }
    let res = sortToDos(a, b, args.highlevelsort);
    // if ((a.todoid == 4 || a.todoid == 6) && (b.todoid == 4 || b.todoid == 6)) {
    //   alert(`High level sorted: ${JSON.stringify(res)}`);
    // }
    if (res != 0) {
      return res;
    }

    if (args.midlevelsort !== "") {
      // mid level sort (if it's defined)
      res = sortToDos(a, b, args.midlevelsort);
      // if (
      //   (a.todoid == 4 || a.todoid == 6) &&
      //   (b.todoid == 4 || b.todoid == 6)
      // ) {
      //   alert(`Mid level sorted: ${JSON.stringify(res)}`);
      // }
      if (res != 0) {
        return res;
      }

      if (args.lowlevelsort !== "") {
        // low level sort (if it's defined)
        res = sortToDos(a, b, args.lowlevelsort);
        // if (
        //   (a.todoid == 4 || a.todoid == 6) &&
        //   (b.todoid == 4 || b.todoid == 6)
        // ) {
        //   alert(`Low level sorted: ${JSON.stringify(res)}`);
        // }
        if (res != 0) {
          return res;
        }
      }
    }

    return 0;
  });

  // alert(`Sorted: ${JSON.stringify(refreshedTodos)}`);

  // clearing virtual todos from all groups
  var clearIdArray: Array<number> = [];
  var refreshedGroups = [...args.groups];
  refreshedGroups = refreshedGroups.map((group) => ({
    ...group,
    virtualToDoIds: clearIdArray,
    remainingReservedSpots: group.todoids ? group.todoids.length : 0,
  }));

  // sort groups by serial number in ascending order
  // alert("Before\n" + JSON.stringify(refreshedGroups));
  refreshedGroups = refreshedGroups.sort(sortGroups);
  // alert("After\n" + JSON.stringify(refreshedGroups));

  // alert("Groups: " + JSON.stringify(refreshedGroups));

  // clearing virtual group pointers from todos
  refreshedTodos = refreshedTodos.map((todo) => ({
    ...todo,
    virtualGroupId: null,
  }));

  // alert("Todos: " + JSON.stringify(refreshedTodos));

  // alert(`Refreshed groups: ${JSON.stringify(refreshedGroups)}`);

  // alert(`Refreshed todos: ${JSON.stringify(refreshedTodos)}`);

  // helper variables
  var ungroupedTodoIds: Array<number> = [];
  var nextMondayMidnight = new Date();
  nextMondayMidnight.setDate(
    nextMondayMidnight.getDate() +
      ((1 + 7 - nextMondayMidnight.getDay()) % 7 || 7)
  );
  nextMondayMidnight.setHours(0, 0, 0, 0);

  // alert(JSON.stringify(nextMondayMidnight) + nextMondayMidnight.getDay());

  // alert(`Refreshed ungrouped: ${JSON.stringify(refreshedUngroupedTodos)}`);

  // skip virtual grouping of todos if there are no groups
  if (!refreshedGroups || refreshedGroups.length == 0) {
    refreshedTodos.forEach((todo) => ungroupedTodoIds.push(todo.todoid));
  } else {
    // otherwise, virtually group todos
    for (let todo of refreshedTodos) {
      // todos that are forced into a group are added
      // to that groups virtual todo list
      // alert(JSON.stringify(todo));
      let acceptedIntoGroup = false;

      // skip grouping if todo is part of an existing group
      if (todo.groupid) {
        if (refreshedGroups.find((g) => g.groupid == todo.groupid)) {
          // append todoid to group's array of virtual todoids
          const groupIndex = refreshedGroups.findIndex((g) =>
            g.groupid == todo.groupid ? true : false
          );
          const refreshedVirtualIds = [
            ...refreshedGroups[groupIndex].virtualToDoIds,
          ];
          refreshedVirtualIds.push(todo.todoid);
          refreshedGroups[groupIndex].virtualToDoIds = [...refreshedVirtualIds];
          refreshedGroups[groupIndex].remainingReservedSpots -= 1;
          todo.virtualGroupId = refreshedGroups[groupIndex].groupid;
          continue;
        } else {
          // if groupid doesn't exist in *groups*, set todo groupid to null
          todo.groupid = null;
        }
      }

      // if no filters are defined, skip virtual grouping
      if (!args.filters || args.filters.length == 0) {
        ungroupedTodoIds.push(todo.todoid);
        continue;
      } else {
        // alert(JSON.stringify(args.filters));
      }

      // iterate over groups
      for (let group of refreshedGroups) {
        // alert(JSON.stringify(todo) + "\n\n" + JSON.stringify(group));
        // skip static groups
        if (!group.filterids || group.filterids.length == 0) {
          continue;
        }

        // data structures for current evaluation
        let acceptIntoCurrent = true;

        // iterate over filters associated with group
        for (let filterId of group.filterids) {
          if (!acceptIntoCurrent) {
            break;
          }

          // find filter for id
          let filter =
            args.filters[
              args.filters.findIndex((el) =>
                el.filterid == filterId ? true : false
              )
            ];

          // alert(
          //   `Group: ${group.groupid}\nGroup filters: ${
          //     group.filterids
          //   }\nFilterid: ${filterId}\nFilter: ${JSON.stringify(filter)}`
          // );

          // alert(JSON.stringify(filter));

          // determine filter type and carry out action
          switch (filter.type) {
            //
            case "sizefilter": {
              assertIsSizeFilter(filter);
              // reject todo if group total size exceeds or is equal to filter defined limit
              // alert(
              //   `${group.virtualToDoIds.length}, ${group.remainingReservedSpots} <?> ${filter.size}`
              // );
              if (
                group.virtualToDoIds.length + group.remainingReservedSpots >=
                filter.size
              ) {
                acceptIntoCurrent = false;
              }
              break;
            }
            //
            case "timeperiodfilter": {
              assertIsTimeperiodFilter(filter);
              const todoDate = new Date(todo.duedate);
              // alert(JSON.stringify(filter));
              // alert(
              //   `Todo: ${
              //     todo.duedate
              //   }\nTodo time:${todoDate.getTime()}\nnext monday: ${nextMondayMidnight.getTime()}\n}`
              // );

              var toDoDow: number;
              if (todoDate.getDay() == 0) {
                toDoDow = 6;
              } else {
                toDoDow = todoDate.getDay() - 1;
              }

              // reject todo if it's due date is next week or later
              if (todoDate.getTime() >= nextMondayMidnight.getTime()) {
                acceptIntoCurrent = false;
              } else {
                // alert(`Accepted into: ${acceptIntoCurrent}`);
                // reject todo if it's due date is earlier than lower bound
                if (filter.lowerbound !== null) {
                  let lowerBoundDOW = timePeriodStringToDOW.get(
                    filter.lowerbound.toLowerCase().slice(0, 3)
                  );
                  // alert(
                  //   `Todo: ${todo.duedate}\nTodo date:${toDoDow}\nLow bound: ${lowerBoundDOW}\n`
                  // );

                  if (lowerBoundDOW && toDoDow < lowerBoundDOW) {
                    acceptIntoCurrent = false;
                  }
                }
                // alert(`Accepted into: ${acceptIntoCurrent}`);
                // reject todo if it's due date is later than higher bound
                if (acceptIntoCurrent && filter.higherbound !== null) {
                  let higherBoundDOW = timePeriodStringToDOW.get(
                    filter.higherbound.toLowerCase().slice(0, 3)
                  );
                  // alert(
                  //   `Todo: ${todo.duedate}\nTodo date:${toDoDow}\nHigh bound: ${higherBoundDOW}\n`
                  // );
                  if (higherBoundDOW && toDoDow > higherBoundDOW) {
                    acceptIntoCurrent = false;
                  }
                }
                // alert(`Accepted into: ${acceptIntoCurrent}`);
              }
              break;
            }
            //
            case "priorityfilter": {
              assertIsPriorityFilter(filter);
              // reject todo if it's priority is lower than lower bound
              if (
                filter.lowerbound !== null &&
                todo.priority < filter.lowerbound
              ) {
                acceptIntoCurrent = false;
              }
              // reject todo if it's priority is higher than higher bound
              else if (
                filter.higherbound !== null &&
                todo.priority > filter.higherbound
              ) {
                acceptIntoCurrent = false;
              }
              break;
            }
            //
            case "prefixfilter": {
              assertIsPrefixFilter(filter);
              // alert(
              //   `${filter.prefix} - ${todo.content.toLowerCase()} - ${todo.content
              //     .toLowerCase()
              //     .includes(filter.prefix)}`
              // );
              // reject todo if the filter.prefix is not a substring of todo.content
              if (!todo.content.toLowerCase().includes(filter.prefix)) {
                acceptIntoCurrent = false;
              }
              break;
            }
          }
        }

        // if todo matches group filters, add todoid to group
        if (acceptIntoCurrent) {
          acceptedIntoGroup = true;
          const groupIndex = refreshedGroups.findIndex((g) =>
            g.groupid == group.groupid ? true : false
          );
          // alert(JSON.stringify(refreshedGroups));
          refreshedGroups[groupIndex].virtualToDoIds = [
            ...refreshedGroups[groupIndex].virtualToDoIds,
            todo.todoid,
          ];
          todo.virtualGroupId = group.groupid;
          // alert(
          //   "Added!\n" + JSON.stringify(todo) + "\n\n" + JSON.stringify(group)
          // );
          // alert(JSON.stringify(refreshedGroups));
          break;
        }
      }

      // if todo not grouped, add todoid to ungrouped todos
      if (!acceptedIntoGroup) {
        ungroupedTodoIds.push(todo.todoid);
      }
    }
  }

  // alert(`Refreshed todos: ${JSON.stringify(refreshedTodos)}`);
  // alert(`Refreshed groups: ${JSON.stringify(refreshedGroups)}`);
  // alert(`Ungrouped: ${JSON.stringify(ungroupedTodoIds)}`);

  //set state
  args.setTodos([...refreshedTodos]);
  args.setGroups([...refreshedGroups]);
  args.setUngroupedTodos([...ungroupedTodoIds]);

  if (args.invokeRefresh) {
    // alert("set forced refresh");
    args.setForceRefresh(true);
  }

  return { todos: refreshedTodos, groups: refreshedGroups };
}
