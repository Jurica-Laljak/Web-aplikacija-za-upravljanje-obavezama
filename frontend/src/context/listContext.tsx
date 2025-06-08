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
  const [highlevelsort, setHighlevelsort] =
    useState<SortType>("timecreated:asc");
  const [midlevelsort, setMidlevelsort] = useState<SortType | "">("");
  const [lowlevelsort, setLowlevelsort] = useState<SortType | "">("");
  const [groups, setGroups] = useState<Array<GroupInternal>>([]);
  const [todos, setTodos] = useState<Array<ToDoInternal>>([]);
  const [ungroupedTodos, setUngroupedTodos] = useState<Array<number>>([]);
  const [fetchedListData, setFetchedListData] = useState<number>(0);
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);

  // use user context
  const { lists, setLists } = useContext(UserContext) as UserContextType;
  // use filter context
  const { filters } = useContext(FilterContext) as FilterContextType;

  const refreshListArgs = {
    setForceRefresh: setForceRefresh,
    highlevelsort: highlevelsort,
    midlevelsort: midlevelsort,
    lowlevelsort: lowlevelsort,
    groups: groups,
    setGroups: setGroups,
    todos: todos,
    setTodos: setTodos,
    setUngroupedTodos: setUngroupedTodos,
    filters: filters,
    invokeRefresh: true,
  };

  function callRefreshList() {
    // alert("Externally calling refresh list");
    return refreshList(refreshListArgs);
  }

  function flushContent() {
    setGroups([]);
    setTodos([]);
    setUngroupedTodos([]);
  }

  function createTodos(providedTodos: ToDoDto[]) {
    if (providedTodos.length > 0) {
      const newTodos: Array<ToDoInternal> = [];
      for (let todo of providedTodos) {
        let expandedTodo = { ...todo, virtualGroupId: null };
        newTodos.push(expandedTodo);
      }
      return refreshList({
        ...refreshListArgs,
        todos: [...todos, ...newTodos],
      });
    }
  }

  function updateTodo(id: number, updateObj: Partial<ToDoDto>) {
    const todoIndex = todos.findIndex((el) => (el.todoid == id ? true : false));
    const updatedTodo = {
      ...todos[todoIndex],
      ...updateObj,
    };
    const todosCopy = [...todos];
    todosCopy[todoIndex] = updatedTodo;
    return refreshList({
      ...refreshListArgs,
      todos: [...todosCopy],
    });
  }

  function deleteTodo(id: number) {
    const todoIndex = todos.findIndex((el) => (el.todoid == id ? true : false));
    const todosCopy = [...todos];
    todosCopy.splice(todoIndex, 1);
    refreshList({
      ...refreshListArgs,
      todos: [...todosCopy],
    });
  }

  function createGroups(providedGroups: GroupDto[], todos?: ToDoInternal[]) {
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
      if (todos) {
        return refreshList({
          ...refreshListArgs,
          groups: [...groups, ...newGroups],
          todos: todos,
        });
      } else {
        return refreshList({
          ...refreshListArgs,
          groups: [...groups, ...newGroups],
        });
      }
    }
  }

  function updateGroup(
    id: number,
    updateObj: Partial<GroupInternal>,
    todos?: ToDoInternal[]
  ) {
    const groupIndex = groups.findIndex((el) =>
      el.groupid == id ? true : false
    );
    const updatedGroup = {
      ...groups[groupIndex],
      ...updateObj,
    };
    const groupsCopy = [...groups];
    groupsCopy[groupIndex] = updatedGroup;
    // alert(JSON.stringify(groupsCopy));
    if (todos)
      refreshList({
        ...refreshListArgs,
        groups: [...groupsCopy],
        todos: todos,
      });
    else
      refreshList({
        ...refreshListArgs,
        groups: [...groupsCopy],
      });
  }

  function switchGroupSerialNumbers(groupId1: number, groupId2: number) {
    const groupsCopy = [...groups];
    //
    const group1Index = groups.findIndex((el) =>
      el.groupid == groupId1 ? true : false
    );
    const group1 = groupsCopy[group1Index];
    //
    const group2Index = groups.findIndex((el) =>
      el.groupid == groupId2 ? true : false
    );
    const group2 = groupsCopy[group2Index];
    //
    groupsCopy[group1Index] = {
      ...group1,
      serialnumber: group2.serialnumber,
    };
    groupsCopy[group2Index] = {
      ...group2,
      serialnumber: group1.serialnumber,
    };
    //
    refreshList({
      ...refreshListArgs,
      groups: [...groupsCopy],
    });
  }

  function deleteGroup(id: number) {
    const groupIndex = groups.findIndex((el) =>
      el.groupid == id ? true : false
    );
    const groupsCopy = [...groups];
    groupsCopy.splice(groupIndex, 1);
    refreshList({
      ...refreshListArgs,
      groups: [...groupsCopy],
    });
  }

  function updateListAttributes(attribute: string, newValue: string | null) {
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
        setHighlevelsort("timecreated:asc");
      } else {
        assertValueIsSortType(newValue);
        setHighlevelsort(newValue);
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
        setGroups,
        todos,
        setTodos,
        ungroupedTodos,
        flushContent,
        createTodos,
        updateTodo,
        deleteTodo,
        createGroups,
        updateGroup,
        switchGroupSerialNumbers,
        deleteGroup,
        updateListAttributes,
        fetchedListData,
        setFetchedListData,
        callRefreshList,
        forceRefresh,
        setForceRefresh,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
