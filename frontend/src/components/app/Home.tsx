import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import "../../styles/app/home.css";

function Home(props: PropsWithChildren) {
  return (
    <div id="app-div">
      <Sidebar></Sidebar>
      <div id="content-area-wrapper">
        <div id="content-area-subwrapper">
          <ContentArea>{props.children}</ContentArea>
        </div>
      </div>
    </div>
  );
}

export default Home;
