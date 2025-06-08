import { dayOfWeekTranslation } from "../../data/translate";
import {
  assertIsPrefixFilter,
  assertIsPriorityFilter,
  assertIsSizeFilter,
  assertIsTimeperiodFilter,
} from "../../helper/filter/assertFilter";
import { FilterInternal } from "../../types/filter/FilterInternal";
import Button from "../element/Button";
import FilterItemWrapper from "./FilterItemWrapper";

function FilterItem(props: { f: FilterInternal }) {
  const buttonStyle: React.CSSProperties = {
    borderColor: "white",
    color: "white",
    fontSize: "1rem",
    padding: "0.25rem",
    marginLeft: "1.25rem",
  };

  //
  if (props.f.type === "sizefilter") {
    assertIsSizeFilter(props.f);
    return (
      <FilterItemWrapper f={props.f}>
        <div className="flex-div-row">
          Broj obaveza u grupi {"<="}{" "}
          <h2>
            <u>{props.f.size}</u>
          </h2>
          {/* <Button className="interactable" style={buttonStyle}>
            Uredite gornju granicu
          </Button> */}
        </div>
      </FilterItemWrapper>
    );
  }
  //
  else if (props.f.type === "timeperiodfilter") {
    assertIsTimeperiodFilter(props.f);
    return (
      <FilterItemWrapper f={props.f}>
        <div>
          Krajnji rok obaveze jest u tekućem tjednu. Dan u tjednu krajnjeg roka
          jest
        </div>
        <div className="flex-div-row">
          {props.f.lowerbound ? (
            <>
              veći od ili jednak<h1></h1>
              <h2>
                <u>{dayOfWeekTranslation.get(props.f.lowerbound)}</u>
              </h2>
            </>
          ) : (
            <></>
          )}
          {/* <Button className="interactable" style={buttonStyle}>
            {props.f.lowerbound !== null
              ? "Uredite gornju granicu"
              : "Dodajte gornju granicu"}
          </Button> */}
        </div>
        <div className="flex-div-row">
          {props.f.higherbound ? (
            <>
              {props.f.lowerbound !== null ? "i" : <></>} manji od ili jednak
              <h1></h1>
              <h2>
                <u>{dayOfWeekTranslation.get(props.f.higherbound)}</u>
              </h2>
            </>
          ) : (
            <></>
          )}
          {/* <Button className="interactable" style={buttonStyle}>
            {props.f.higherbound !== null
              ? "Uredite gornju granicu"
              : "Dodajte gornju granicu"}
          </Button> */}
        </div>
      </FilterItemWrapper>
    );
  }
  //
  else if (props.f.type === "priorityfilter") {
    assertIsPriorityFilter(props.f);
    return (
      <FilterItemWrapper f={props.f}>
        <div>Prioritet obaveze jest</div>
        <div className="flex-div-row">
          {props.f.lowerbound ? (
            <>
              veći od ili jednak<h1></h1>
              <h2>
                <u>{props.f.lowerbound}</u>
              </h2>
            </>
          ) : (
            <></>
          )}
          {/* <Button className="interactable" style={buttonStyle}>
            {props.f.lowerbound !== null
              ? "Uredite gornju granicu"
              : "Dodajte gornju granicu"}
          </Button> */}
        </div>
        <div className="flex-div-row">
          {props.f.higherbound ? (
            <>
              {props.f.lowerbound !== null ? "i" : <></>} manji od ili jednak
              <h1></h1>
              <h2>
                <u>{props.f.higherbound}</u>
              </h2>
            </>
          ) : (
            <></>
          )}
          {/* <Button className="interactable" style={buttonStyle}>
            {props.f.higherbound !== null
              ? "Uredite gornju granicu"
              : "Dodajte gornju granicu"}
          </Button> */}
        </div>
      </FilterItemWrapper>
    );
  }
  //
  else if (props.f.type === "prefixfilter") {
    assertIsPrefixFilter(props.f);
    return (
      <FilterItemWrapper f={props.f}>
        <div className="flex-div-row">
          Obaveza sadrži
          <h2>
            <u>
              {`"`}
              {props.f.prefix}
              {`"`}
            </u>
          </h2>
          {/* <Button className="interactable" style={buttonStyle}>
            Uredite prefiks
          </Button> */}
        </div>
      </FilterItemWrapper>
    );
  }

  return <></>;
}

export default FilterItem;
