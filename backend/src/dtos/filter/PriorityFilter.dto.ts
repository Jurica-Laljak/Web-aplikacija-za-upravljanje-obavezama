import { FilterDto } from "./Filter.dto";

export interface PriorityFilter extends FilterDto {
  lowerbound: string;
  higherbound: string;
}
