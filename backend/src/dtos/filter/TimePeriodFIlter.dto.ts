import { FilterDto } from "./Filter.dto";

export interface TimePeriodFilter extends FilterDto {
  datetype: string;
  lowerbound: string;
  higherbound: string;
}
