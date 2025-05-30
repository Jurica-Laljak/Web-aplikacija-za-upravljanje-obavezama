import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ToDoListMiddleware from "./components/todolist/ToDoListMiddleware";
import FilterMiddleware from "./components/filter/FilterMiddleware";
import NotFoundPage from "./components/auth/NotFoundPage";
import { UserContextProvider } from "./context/userContext";
import Home from "./components/app/Home";
import AntiProtectedRoute from "./components/auth/AntiProtectedRoute";
import LoginMiddleware from "./components/login/LoginMiddleware";
import CalendarMiddleware from "./components/calendar/CalendarMiddleware";
import "./styles/common.css";
import RegisterMiddleware from "./components/register/RegisterMiddleware";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewContextProvider } from "./context/viewContext";
import { filterNames } from "./data/filterNames";
import HomeContent from "./components/app/HomeContent";

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
            <ToDoListMiddleware></ToDoListMiddleware>
          </Home>
        </ProtectedRoute>
      ),
    },
    {
      path: `/filter/:filterName`,
      element: (
        <ProtectedRoute>
          <Home>
            <FilterMiddleware></FilterMiddleware>
          </Home>
        </ProtectedRoute>
      ),
    },
    {
      path: "/calendar",
      element: (
        <ProtectedRoute>
          <Home>
            <CalendarMiddleware></CalendarMiddleware>
          </Home>
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <NotFoundPage></NotFoundPage> },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ViewContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </ViewContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
