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
sortIcons.set("timecreated:asc", `Po starosti ⇈`);
sortIcons.set("timecreated:desc", `Po starosti ⇊`);
sortIcons.set("alphabetical:asc", `Po sadržaju ⇈`);
sortIcons.set("alphabetical:desc", `Po sadržaju ⇊`);
sortIcons.set("duedate:asc", `Po roku ⇈`);
sortIcons.set("duedate:desc", `Po roku ⇊`);
sortIcons.set("priority:asc", `Po prioritetu ⇈`);
sortIcons.set("priority:desc", `Po prioritetu ⇊`);
