import React, { useContext, useState } from "react";
import { ListContextType } from "../types/list/ListContextType";
import { SortType } from "../../../shared/list/SortType";
import { GroupDto } from "../../../shared/group/Group.dto";
import { ToDoDto } from "../../../shared/todo/ToDo.dto";
import { refreshList } from "../helper/todo/refreshList";
import { assertValueIsSortType } from "../helper/todo/assertToDoList";
import { GroupInternal } from "../types/group/GroupInternal";
import { ToDoInternal } from "../types/todo/ToDoInternal";
import { FilterContext } from "./filterContext";
import { FilterContextType } from "../types/filter/FilterContextType";
import { UserContext } from "./userContext";
import { UserContextType } from "../types/user/UserContext";
import { ToDoListCore } from "../../../shared/list/ToDoListCore";

export const ListContext = React.createContext<ListContextType | null>(null);

export const ListContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //
  const [name, setName] = useState("");
  const [highlevelsort, setHiglevelsort] =
    useState<SortType>("timecreated:asc");
  const [midlevelsort, setMidlevelsort] = useState<SortType | "">("");
  const [lowlevelsort, setLowlevelsort] = useState<SortType | "">("");
  const [groups, setGroups] = useState<Array<GroupInternal>>([]);
  const [todos, setTodos] = useState<Array<ToDoInternal>>([]);
  const [ungroupedTodos, setUngroupedTodos] = useState<Array<number>>([]);

  // use user context
  const { lists, setLists } = useContext(UserContext) as UserContextType;
  // use filter context
  const { filters } = useContext(FilterContext) as FilterContextType;

  const refreshListArgs = {
    highlevelsort,
    midlevelsort,
    lowlevelsort,
    groups,
    setGroups,
    todos,
    setTodos,
    setUngroupedTodos,
    filters,
  };

  function flushContent() {
    setGroups([]);
    setTodos([]);
    setUngroupedTodos([]);
  }

  function createTodos(todos: ToDoDto[], invokeRefresh: boolean = true) {
    if (todos.length > 0) {
      setTodos((prev) => {
        for (let todo of todos) {
          let expandedTodo = { ...todo, virtualGroupId: null };
          prev.push(expandedTodo);
        }
        return prev;
      });
      if (invokeRefresh) {
        refreshList(refreshListArgs);
      }
    }
  }

  function updateTodo(updatedTodo: ToDoInternal) {
    const id = updatedTodo.todoid;
    setTodos((prev) => {
      return prev.splice(
        prev.findIndex((el) => {
          el.todoid === id ? true : false;
        }),
        1,
        updatedTodo
      );
    });
    refreshList(refreshListArgs);
  }

  function deleteTodo(id: number) {
    setTodos((prev) => {
      return prev.splice(
        prev.findIndex((el) => {
          el.todoid === id ? true : false;
        }),
        1
      );
    });
    refreshList(refreshListArgs);
  }

  function createGroups(groups: GroupDto[], invokeRefresh: boolean = true) {
    if (groups.length > 0) {
      setGroups((prev) => {
        for (let group of groups) {
          let virutalToDoIds: Array<number> = [];
          let expandedGroup = { ...group, virtualToDoIds: virutalToDoIds };
          prev.push(expandedGroup);
        }
        return prev;
      });
      if (invokeRefresh) {
        refreshList(refreshListArgs);
      }
    }
  }

  function updateGroup(updatedGroup: GroupInternal) {
    const id = updatedGroup.groupid;
    setGroups((prev) => {
      return prev.splice(
        prev.findIndex((el) => {
          el.groupid === id ? true : false;
        }),
        1,
        updatedGroup
      );
    });
    refreshList(refreshListArgs);
  }

  function deleteGroup(id: number) {
    setTodos((prev) => {
      return prev.splice(
        prev.findIndex((el) => {
          el.groupid === id ? true : false;
        }),
        1
      );
    });
    refreshList(refreshListArgs);
  }

  function updateListAttributes(
    attribute: string,
    newValue: string | null,
    invokeRefresh: boolean = true
  ) {
    if (attribute === "name" && newValue !== null) {
      const listId =
        lists[lists.findIndex((el) => (el.name === newValue ? true : false))]
          .listid;
      setName(name);
      const newObj: ToDoListCore = { listid: listId, name: newValue };
      setLists([...lists, newObj]);

      return;
    }

    if (attribute === "highlevelsort") {
      if (newValue === null) {
        setHiglevelsort("timecreated:asc");
      } else {
        assertValueIsSortType(newValue);
        setHiglevelsort(newValue);
      }
    } else if (attribute === "midlevelsort") {
      if (newValue === null) {
        setMidlevelsort("");
      } else {
        assertValueIsSortType(newValue);
        setMidlevelsort(newValue);
      }
    } else if (attribute === "lowlevelsort") {
      if (newValue === null) {
        setLowlevelsort("");
      } else {
        assertValueIsSortType(newValue);
        setLowlevelsort(newValue);
      }
    }

    if (invokeRefresh) {
      refreshList(refreshListArgs);
    }
  }

  return (
    <ListContext.Provider
      value={{
        name,
        setName,
        highlevelsort,
        midlevelsort,
        lowlevelsort,
        groups,
        todos,
        ungroupedTodos,
        flushContent,
        createTodos,
        updateTodo,
        deleteTodo,
        createGroups,
        updateGroup,
        deleteGroup,
        updateListAttributes,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
