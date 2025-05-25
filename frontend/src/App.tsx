import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ToDoListMiddleware from "./components/todolist/ToDoListMiddleware";
import FilterMiddleware from "./components/filter/FilterMiddleware";
import NotFoundPage from "./components/other/NotFoundPage";
import { UserContext, UserContextType } from "./context/userContext";
import Home from "./components/app/Home";
import AntiProtectedRoute from "./components/auth/AntiProtectedRoute";
import LoginMiddleware from "./components/login/LoginMiddleware";
import CalendarMiddleware from "./components/calendar/CalendarMiddleware";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home></Home>
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
      path: "/list/:id",
      element: (
        <ProtectedRoute>
          <Home>
            <ToDoListMiddleware></ToDoListMiddleware>
          </Home>
        </ProtectedRoute>
      ),
    },
    {
      path: "/filters",
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

  var userContext: UserContextType = {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
    userId: localStorage.getItem("userId"),
    refreshToken: localStorage.getItem("refreshToken"),
    accessToken: localStorage.getItem("accessToken"),
  };

  return (
    <UserContext.Provider value={userContext}>
      <RouterProvider router={router}></RouterProvider>
    </UserContext.Provider>
  );
}

export default App;
