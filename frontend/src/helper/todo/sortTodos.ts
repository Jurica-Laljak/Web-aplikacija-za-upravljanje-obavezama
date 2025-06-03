import { SortType } from "../../../../shared/list/SortType";
import { ToDoInternal } from "../../types/todo/ToDoInternal";

export function sortToDos(
  a: ToDoInternal,
  b: ToDoInternal,
  sortType: SortType
): number {
  switch (sortType) {
    case "timecreated:asc": {
      if (a.todoid < b.todoid) {
        return -1;
      }
      if (a.todoid > b.todoid) {
        return 1;
      }
      return 0;
    }
    case "timecreated:desc": {
      if (a.todoid > b.todoid) {
        return 1;
      }
      if (a.todoid < b.todoid) {
        return -1;
      }
      return 0;
    }
    case "alphabetical:asc": {
      if (a.content.toLocaleLowerCase() < b.content.toLocaleLowerCase()) {
        return -1;
      }
      if (a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    }
    case "alphabetical:desc": {
      if (a.content.toLocaleLowerCase() < b.content.toLocaleLowerCase()) {
        return 1;
      }
      if (a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase()) {
        return -1;
      }
      return 0;
    }
    case "duedate:asc": {
      if (a.duedate.getTime() < b.duedate.getTime()) {
        return -1;
      }
      if (a.duedate.getTime() > b.duedate.getTime()) {
        return 1;
      }
      return 0;
    }
    case "duedate:desc": {
      if (a.duedate.getTime() < b.duedate.getTime()) {
        return 1;
      }
      if (a.duedate.getTime() > b.duedate.getTime()) {
        return -1;
      }
      return 0;
    }
    case "priority:asc": {
      if (a.priority < b.priority) {
        return 1;
      }
      if (a.priority > b.priority) {
        return -1;
      }
      return 0;
    }
    case "priority:desc": {
      if (a.priority < b.priority) {
        return -1;
      }
      if (a.priority > b.priority) {
        return 1;
      }
      return 0;
    }
  }
}
