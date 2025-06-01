import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ToDoListMiddleware from "./components/todolist/ToDoListMiddleware";
import FilterMiddleware from "./components/filter/FilterMiddleware";
import NotFoundPage from "./components/auth/NotFoundPage";
import { UserContextProvider } from "./context/userContext";
import Home from "./components/home/Home";
import AntiProtectedRoute from "./components/auth/AntiProtectedRoute";
import LoginMiddleware from "./components/login/LoginMiddleware";
import CalendarMiddleware from "./components/calendar/CalendarMiddleware";
import "./styles/common.css";
import RegisterMiddleware from "./components/register/RegisterMiddleware";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewContextProvider } from "./context/viewContext";

import HomeContent from "./components/home/HomeContent";
import ToDoListHeader from "./components/todolist/ToDoListHeader";
import ToDoListContent from "./components/todolist/ToDoListContent";
import { FilterContextProvider } from "./context/filterContext";
import { ListContext, ListContextProvider } from "./context/listContext";
import ToDoListFooter from "./components/todolist/ToDoListFooter";
import FilterDOM from "./components/filter/FilterContent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home>
            <HomeContent></HomeContent>
          </Home>
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <AntiProtectedRoute>
          <LoginMiddleware></LoginMiddleware>
        </AntiProtectedRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <AntiProtectedRoute>
          <RegisterMiddleware></RegisterMiddleware>
        </AntiProtectedRoute>
      ),
    },
    {
      path: "/list/:listId",
      element: (
        <ProtectedRoute>
          <Home>
            <ListContextProvider>
              <ToDoListMiddleware>
                <ToDoListHeader></ToDoListHeader>
                <ToDoListContent></ToDoListContent>
                <ToDoListFooter></ToDoListFooter>
              </ToDoListMiddleware>
            </ListContextProvider>
          </Home>
        </ProtectedRoute>
      ),
    },
    {
      path: `/filter/:filterName`,
      element: (
        <ProtectedRoute>
          <Home>
            <FilterDOM></FilterDOM>
          </Home>
        </ProtectedRoute>
      ),
    },
    // {
    //   path: "/calendar",
    //   element: (
    //     <ProtectedRoute>
    //       <Home>
    //         <CalendarMiddleware></CalendarMiddleware>
    //       </Home>
    //     </ProtectedRoute>
    //   ),
    // },
    { path: "*", element: <NotFoundPage></NotFoundPage> },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ViewContextProvider>
          <FilterContextProvider>
            <RouterProvider router={router}></RouterProvider>
          </FilterContextProvider>
        </ViewContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
