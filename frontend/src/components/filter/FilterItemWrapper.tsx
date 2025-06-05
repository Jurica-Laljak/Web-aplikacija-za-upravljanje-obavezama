import { ReactNode } from "react";
import { FilterInternal } from "../../types/filter/FilterInternal";
import Button from "../element/Button";
import IconText from "../element/IconText";
import { CgRename } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { largeIcon } from "../../types/style/iconStyle";

function FilterItemWrapper(props: { children?: ReactNode; f: FilterInternal }) {
  return (
    <div className="flex-div-column filter-wrapper">
      <div className="flex-div-row">
        <div>
          [{props.f.filterid}] {props.f.name}
        </div>
        <Button className="hover filter-operator">
          <IconText icon={<CgRename />} iconStyle={largeIcon}></IconText>
        </Button>
        <Button className="hover filter-operator">
          <IconText icon={<MdDelete />} iconStyle={largeIcon}></IconText>
        </Button>
      </div>
      <div className="flex-div-column filter-content-wrapper">
        {props.children}
      </div>
    </div>
  );
}

export default FilterItemWrapper;
