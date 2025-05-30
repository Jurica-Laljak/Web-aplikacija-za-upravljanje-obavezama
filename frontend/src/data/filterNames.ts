export const filterNames = [
  "size",
  "priority",
  "timeperiod",
  "prefix",
] as const;

export type FilterName = typeof filterNames;
