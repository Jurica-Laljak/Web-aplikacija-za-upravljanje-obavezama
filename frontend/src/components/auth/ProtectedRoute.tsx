import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { Navigate } from "react-router";

function ProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext) as UserContextType;
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
      if (window.location.href.includes("list")) {
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
            window.location.href = "http://localhost:5173/";
          } else {
            userContext.setOpenedTab("list");
            // userContext.setLists(
            //   userContext.lists.map((el) => {
            //     if (el.listid == listidNum) {
            //       return { ...el, selected: true };
            //     } else {
            //       return { ...el, selected: false };
            //     }
            //   })
            // );
          }
        }
      } else {
        userContext.setShowList(false);
        if (window.location.href.includes("filters")) {
          userContext.setOpenedTab("filters");
          // userContext.setLists(
          //   userContext.lists.map((el) => {
          //     if (el.selected) {
          //       return { ...el, selected: false };
          //     } else {
          //       return el;
          //     }
          //   })
          // );
        } else if (window.location.href.includes("calendar")) {
          userContext.setOpenedTab("calendar");
          // userContext.lists.map((el) => {
          //   if (el.selected) {
          //     return { ...el, selected: false };
          //   } else {
          //     return el;
          //   }
          // });
        } else {
          userContext.setOpenedTab(undefined);
        }
      }
    }
  }, [window.location.href, userContext.listid]);

  useEffect(() => {
    if (!window.location.href.includes("list")) {
      userContext.setListid(undefined);
    }
  }, [window.location.href]);

  if (contextValid) return <>{props.children}</>;

  return <Navigate to={"/login"}></Navigate>;
}

export default ProtectedRoute;
