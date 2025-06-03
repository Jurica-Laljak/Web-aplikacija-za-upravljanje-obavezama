import {
  assertIsPrefixFilter,
  assertIsPriorityFilter,
  assertIsSizeFilter,
  assertIsTimeperiodFilter,
} from "../../helper/filter/assertFilter";
import { FilterInternal } from "../../types/filter/FilterInternal";

function FilterItem(props: { f: FilterInternal }) {
  // alert(`In item ${JSON.stringify(props.f)}`);

  if (props.f.type === "sizefilter") {
    assertIsSizeFilter(props.f);
    return <p>{props.f.size}</p>;
  } else if (props.f.type === "timeperiodfilter") {
    assertIsTimeperiodFilter(props.f);
    return (
      <p>
        {props.f.lowerbound} - {props.f.higherbound}
      </p>
    );
  } else if (props.f.type === "priorityfilter") {
    assertIsPriorityFilter(props.f);
    return (
      <p>
        {props.f.lowerbound} - {props.f.higherbound}
      </p>
    );
  } else if (props.f.type === "prefixfilter") {
    assertIsPrefixFilter(props.f);
    return <p>{props.f.prefix}</p>;
  }

  return <p>No dice</p>;
}

export default FilterItem;
