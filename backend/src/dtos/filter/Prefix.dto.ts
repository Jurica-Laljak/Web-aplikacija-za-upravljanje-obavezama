import { FilterDto } from "./Filter.dto";

export interface PrefixDto extends FilterDto {
  prefix: string;
}
