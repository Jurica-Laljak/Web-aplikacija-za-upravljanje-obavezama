import { GoNumber } from "react-icons/go";
import { IoIosTimer, IoMdResize } from "react-icons/io";
import { SiAutoprefixer } from "react-icons/si";

export const filterIcon = {
  size: <IoMdResize />,
  priority: <GoNumber />,
  timeperiod: <IoIosTimer />,
  prefix: <SiAutoprefixer />,
};

export const filterIconMap = new Map();
filterIconMap.set("size", <IoMdResize />);
filterIconMap.set("timeperiod", <IoIosTimer />);
filterIconMap.set("priority", <GoNumber />);
filterIconMap.set("prefix", <SiAutoprefixer />);
