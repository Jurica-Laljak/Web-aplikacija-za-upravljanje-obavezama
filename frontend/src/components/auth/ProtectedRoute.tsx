import { PropsWithChildren, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { Navigate, useLocation, useParams } from "react-router";
import { ViewContext } from "../../context/viewContext";
import { ViewContextType } from "../../types/other/ViewContext";
import { filterNames } from "../../data/filterNames";
import { REACT_URI } from "../../data/URIs";

function ProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext) as UserContextType;
  const viewContext = useContext(ViewContext) as ViewContextType;
  const location = useLocation();
  const contextValid =
    userContext.accessToken &&
    userContext.username &&
    userContext.password &&
    userContext.lists;

  useEffect(() => {
    //
    // alert(JSON.stringify(userContext));
    //

    if (contextValid) {
      if (location.pathname.includes("list")) {
        // checking if listid is user's
        const currentListId = window.location.href.slice(27);
        if (currentListId !== "") {
          const listidNum = Number(currentListId);
          var idExists = false;
          for (let el of userContext.lists) {
            if (el.listid == listidNum) {
              idExists = true;
              break;
            }
          }

          if (Number.isNaN(listidNum) || !idExists) {
            // if user doesn't own list, redirect back to home
            window.location.href = REACT_URI;
          } else {
            viewContext.setOpenedTab("list");
            userContext.setListid(currentListId);
          }
        }
      } else {
        // list not in focus; need to clear current list id
        userContext.setListid(undefined);

        if (location.pathname.includes("filter")) {
          // check if suffix is filter type
          const uriSuffix = window.location.href.slice(29);
          var contains = false;
          filterNames.forEach((fi) =>
            String(fi) === uriSuffix ? (contains = true) : null
          );
          if (contains) {
            viewContext.setOpenedTab("filter");
          } else {
            window.location.href = REACT_URI;
          }

          for (let i = 0; i < filterNames.length; i++) {
            if (window.location.href.includes(filterNames[i])) {
              viewContext.setSelectedFilter(filterNames[i]);
            }
          }
        } else if (location.pathname.includes("calendar")) {
          viewContext.setOpenedTab("calendar");
        } else {
          viewContext.setOpenedTab(undefined);
        }
      }
    }
  }, [location.pathname]);

  if (contextValid) return <>{props.children}</>;

  return <Navigate to={"/login"}></Navigate>;
}

export default ProtectedRoute;
