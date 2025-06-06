import { ReactNode } from "react";

export const sortTypes = [
  "timecreated:asc",
  "timecreated:desc",
  "alphabetical:asc",
  "alphabetical:desc",
  "duedate:asc",
  "duedate:desc",
  "priority:asc",
  "priority:desc",
];

export const sortIcons: Map<string, ReactNode> = new Map();
sortIcons.set("timecreated:asc", `Starosti ⇈`);
sortIcons.set("timecreated:desc", `Starosti ⇊`);
sortIcons.set("alphabetical:asc", `Sadržaju ⇈`);
sortIcons.set("alphabetical:desc", `Sadržaju ⇊`);
sortIcons.set("duedate:asc", `Krajnjem roku ⇈`);
sortIcons.set("duedate:desc", `Krajnjem roku ⇊`);
sortIcons.set("priority:asc", `Prioritetu ⇈`);
sortIcons.set("priority:desc", `Prioritetu ⇊`);
