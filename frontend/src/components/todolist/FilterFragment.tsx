import { filterIconMap } from "../../data/filterIcon";
import { FilterInternal } from "../../types/filter/FilterInternal";
import { mediumIcon, smallIcon } from "../../types/style/iconStyle";
import ButtonLink from "../element/ButtonLink";
import IconText from "../element/IconText";

function FilterFragment(props: { filter: FilterInternal }) {
  return (
    <ButtonLink
      to={`/filter/${props.filter.type.replace("filter", "")}`}
      key={`filter-label-${props.filter.filterid}`}
      className="interactable"
      style={{
        borderColor: "var(--secondary-color)",
        color: "var(--secondary-color)",
        backgroundColor: "inherit",
        fontWeight: "bold",
      }}
    >
      <IconText
        icon={filterIconMap.get(props.filter.type.replace("filter", ""))}
        iconStyle={smallIcon}
        style={{ gap: "0.25rem" }}
      >
        <div>[{props.filter.filterid}]</div>
        <div className="filter-label">{props.filter.name}</div>
      </IconText>
    </ButtonLink>
  );
}

export default FilterFragment;
