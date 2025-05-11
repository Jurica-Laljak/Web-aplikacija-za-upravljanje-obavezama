export interface FilterCore {
  name: string;
  userid: number;
}

export interface Filter extends FilterCore {
  filterid: number;
}
