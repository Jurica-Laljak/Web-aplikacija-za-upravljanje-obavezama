import { filterIconMap } from "../../data/filterIcon";
import { capitalize } from "../../helper/capitalize";
import { veryLargeIcon } from "../../types/style/iconStyle";
import IconText from "../element/IconText";

function FilterContentHeader(props: { type: string }) {
  return (
    <div className="flex-div-row header" id="filter-header">
      <IconText
        icon={filterIconMap.get(props.type)}
        iconStyle={veryLargeIcon}
        className="filter-icontext"
      >
        {capitalize(props.type)} filtri
      </IconText>
    </div>
  );
}

export default FilterContentHeader;
