import { SortType } from "../../../../shared/list/SortType";
import { ToDoInternal } from "../../types/todo/ToDoInternal";

export function sortToDos(
  a: ToDoInternal,
  b: ToDoInternal,
  sortType: SortType
): number {
  //   alert(`a = ${JSON.stringify(a)}

  // b = ${JSON.stringify(b)}`);
  switch (sortType) {
    //
    case "timecreated:asc": {
      if (a.todoid < b.todoid) {
        return 1;
      }
      if (a.todoid > b.todoid) {
        return -1;
      }
      return 0;
    }
    case "timecreated:desc": {
      if (a.todoid < b.todoid) {
        return -1;
      }
      if (a.todoid > b.todoid) {
        return 1;
      }
      return 0;
    }

    //
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

    //
    case "duedate:asc": {
      if (a.duedate === null && b.duedate !== null) {
        return 1;
      } else if (a.duedate !== null && b.duedate === null) {
        return -1;
      } else if (a.duedate === null && b.duedate === null) {
        return 0;
      }

      const aDate = new Date(a.duedate);
      const bDate = new Date(b.duedate);

      if (aDate.getTime() < bDate.getTime()) {
        return -1;
      }
      if (aDate.getTime() > bDate.getTime()) {
        return 1;
      }
      return 0;
    }
    case "duedate:desc": {
      if (a.duedate === null && b.duedate !== null) {
        return 1;
      } else if (a.duedate !== null && b.duedate === null) {
        return -1;
      } else if (a.duedate === null && b.duedate === null) {
        return 0;
      }

      const aDate = new Date(a.duedate);
      const bDate = new Date(b.duedate);

      if (aDate.getTime() < bDate.getTime()) {
        return 1;
      }
      if (aDate.getTime() > bDate.getTime()) {
        return -1;
      }
      return 0;
    }

    //
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
