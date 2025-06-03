import { Filter } from "../../../../backend/src/interfaces/filter/Filter";

export interface FilterInternal extends Filter {
  type: string;
}
