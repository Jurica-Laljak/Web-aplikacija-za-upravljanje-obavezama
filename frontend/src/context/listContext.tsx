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

  function callRefreshList() {
    refreshList(refreshListArgs);
  }

  function flushContent() {
    setGroups([]);
    setTodos([]);
    setUngroupedTodos([]);
  }

  function createTodos(
    providedTodos: ToDoDto[],
    invokeRefresh: boolean = true
  ) {
    if (providedTodos.length > 0) {
      const newTodos: Array<ToDoInternal> = [];
      for (let todo of providedTodos) {
        let expandedTodo = { ...todo, virtualGroupId: null };
        newTodos.push(expandedTodo);
      }
      setTodos([...todos, ...newTodos]);
      if (invokeRefresh) {
        callRefreshList();
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
    callRefreshList();
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
    callRefreshList();
  }

  function createGroups(
    providedGroups: GroupDto[],
    invokeRefresh: boolean = true
  ) {
    if (providedGroups.length > 0) {
      const newGroups: Array<GroupInternal> = [];
      for (let group of providedGroups) {
        let virutalToDoIds: Array<number> = [];
        let expandedGroup = {
          ...group,
          virtualToDoIds: virutalToDoIds,
          remainingReservedSpots: 0,
        };
        newGroups.push(expandedGroup);
      }
      setGroups([...groups, ...newGroups]);
      if (invokeRefresh) {
        callRefreshList();
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
    callRefreshList();
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
    callRefreshList();
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
      callRefreshList();
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
        callRefreshList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
