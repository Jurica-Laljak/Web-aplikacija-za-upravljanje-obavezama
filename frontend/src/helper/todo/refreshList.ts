import { SortType } from "../../../../shared/list/SortType";
import timePeriodStringToDOW from "../../data/timePeriodStringToDOW";
import { FilterInternal } from "../../types/filter/FilterInternal";
import { GroupInternal } from "../../types/group/GroupInternal";
import { ToDoInternal } from "../../types/todo/ToDoInternal";
import {
  assertIsPrefixFilter,
  assertIsPriorityFilter,
  assertIsSizeFilter,
  assertIsTimeperiodFilter,
} from "../filter/assertFilter";
import { sortToDos } from "./sortTodos";

export function refreshList(args: {
  highlevelsort: SortType;
  midlevelsort: SortType | "";
  lowlevelsort: SortType | "";
  groups: Array<GroupInternal>;
  setGroups: React.Dispatch<React.SetStateAction<GroupInternal[]>>;
  todos: Array<ToDoInternal>;
  setTodos: React.Dispatch<React.SetStateAction<ToDoInternal[]>>;
  setUngroupedTodos: React.Dispatch<React.SetStateAction<number[]>>;
  filters: FilterInternal[];
}) {
  var refreshedTodos = [...args.todos];

  // sort todos based on sort preferences
  refreshedTodos = refreshedTodos.sort((a, b) => {
    // high level sort
    let res = sortToDos(a, b, args.highlevelsort);
    if (res != 0) {
      return res;
    }

    if (args.midlevelsort !== "") {
      // mid level sort (if it's defined)
      res = sortToDos(a, b, args.midlevelsort);
      if (res != 0) {
        return res;
      }

      if (args.lowlevelsort !== "") {
        // low level sort (if it's defined)
        res = sortToDos(a, b, args.lowlevelsort);
        if (res != 0) {
          return res;
        }
      }
    }

    return 0;
  });

  // clearing virtual todos from all groups
  var clearIdArray: Array<number> = [];
  var refreshedGroups = [...args.groups];
  refreshedGroups = refreshedGroups.map((group) => ({
    ...group,
    virtualToDoIds: clearIdArray,
  }));

  // clearing virtual group pointers from todos
  refreshedTodos = refreshedTodos.map((todo) => ({
    ...todo,
    virtualGroupId: null,
  }));

  // helper variables
  var refreshedUngroupedTodos: Array<number> = [];
  var nextMondayMidnight = new Date();
  nextMondayMidnight.setDate(
    nextMondayMidnight.getDate() +
      ((1 + 7 - nextMondayMidnight.getDay()) % 7 || 7) +
      1
  );
  nextMondayMidnight.setHours(0, 0, 0, 0);

  // virtually group todos
  for (let todo of refreshedTodos) {
    // skip todos that are forced into a group
    if (todo.groupid) {
      continue;
    }

    let acceptedIntoGroup = false;

    // iterate over groups
    for (let group of refreshedGroups) {
      // skip static groups
      if (group.filterIds.length == 0) {
        continue;
      }

      // data structures for current evaluation
      let acceptIntoCurrent = true;
      let totalSize = group.toDoIds.length + group.virtualToDoIds.length;

      // iterate over filters associated with group
      for (let filterId of group.filterIds) {
        if (!acceptIntoCurrent) break;

        // find filter for id
        let filter =
          args.filters[
            args.filters.findIndex((el) =>
              el.filterid == filterId ? true : false
            )
          ];

        // determine filter type and carry out action
        switch (filter.type) {
          //
          case "sizefilter": {
            assertIsSizeFilter(filter);
            // reject todo if group total size exceeds or is equal to filter defined limit
            if (totalSize >= filter.size) {
              acceptIntoCurrent = false;
            }
            break;
          }
          //
          case "timeperiodfilter": {
            assertIsTimeperiodFilter(filter);
            // reject todo if it's due date is next week or later
            if (todo.duedate.getTime() >= nextMondayMidnight.getTime()) {
              acceptIntoCurrent = false;
            }
            // reject todo if it's due date is earlier than lower bound
            else if (filter.lowerbound !== null) {
              let lowerBoundDOW = timePeriodStringToDOW.get(
                filter.lowerbound.toLowerCase().slice(0, 3)
              );
              if (lowerBoundDOW && todo.duedate.getDay() < lowerBoundDOW) {
                acceptIntoCurrent = false;
              }
            }
            // reject todo if it's due date is later than higher bound
            else if (filter.higherbound !== null) {
              let higherBoundDOW = timePeriodStringToDOW.get(
                filter.higherbound.toLowerCase().slice(0, 3)
              );
              if (higherBoundDOW && todo.duedate.getDay() > higherBoundDOW) {
                acceptIntoCurrent = false;
              }
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
            // reject todo if the filter.prefix is not a substring of todo.content
            if (todo.content.toLowerCase().includes(filter.prefix)) {
              acceptIntoCurrent = true;
            }
            break;
          }
        }
      }

      // if todo matches group filters, add todoid to group
      if (acceptIntoCurrent) {
        acceptedIntoGroup = true;
        group.virtualToDoIds.push(todo.todoid);
        todo.virtualGroupId = group.groupid;
        break;
      }
    }

    // if todo not grouped, add todoid to ungrouped todos
    if (!acceptedIntoGroup) {
      refreshedUngroupedTodos.push(todo.todoid);
    }
  }

  //set state
  args.setTodos(refreshedTodos);
  args.setGroups(refreshedGroups);
  args.setUngroupedTodos(refreshedUngroupedTodos);
}
