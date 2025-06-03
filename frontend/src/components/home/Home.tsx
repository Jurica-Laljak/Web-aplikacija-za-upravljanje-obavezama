import { PropsWithChildren, useContext, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import ContentArea from "./ContentArea";
import "../../styles/app/home.css";
import { FilterContext } from "../../context/filterContext";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { call } from "../../api/call";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { AllFilters } from "../../../../backend/src/interfaces/filter/AllFilters";
import { SizeFilterDto } from "../../../../shared/filter/Filter.dto";
import { ViewContext } from "../../context/viewContext";
import { ViewContextType } from "../../types/other/ViewContext";
import Button from "../element/Button";
import { flushContent } from "../../handlers/app/flushContent";

function Home(props: PropsWithChildren) {
  const filterContext = useContext(FilterContext) as FilterContextType;
  const userContext = useContext(UserContext) as UserContextType;
  const viewContext = useContext(ViewContext) as ViewContextType;

  useEffect(() => {
    call<any, AllFilters>("/filter/", "get", {}, userContext).then((data) => {
      // alert(JSON.stringify(data));

      filterContext.saveFilters(data.sizefilters);
      filterContext.saveFilters(data.timeperiodfilters);
      filterContext.saveFilters(data.priorityfilters);
      filterContext.saveFilters(data.prefixfilters);

      // alert(JSON.stringify(filterContext));
    });
  }, []);

  return (
    <div id="app-div">
      <Sidebar></Sidebar>
      <div id="content-area-wrapper">
        <div id="content-area-subwrapper">
          <ContentArea>{props.children}</ContentArea>
        </div>
      </div>
      <div
        className={
          viewContext.elementFocused ? "show-fullscreen" : "fullscreen-div"
        }
      >
        <div id="fullscreen-content-wrapper">
          <div id="inject-header">{viewContext.fullscreenHeader}</div>
          <div id="inject-content">{viewContext.fullscreenContent}</div>
          <Button id="quit-button" onClick={() => flushContent(viewContext)}>
            Odustanite
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
