import { useState } from "react";

type LocalStorageSetterFunction = {
  description: string;
  (currentValue: string): string;
};

export const useLocalStorage = (key: string, defaultValue?: string) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else if (defaultValue) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      } else {
        return undefined;
      }
    } catch (error) {
      return undefined;
    }
  });

  const setLocalStorageStateValue = (
    valueOrFn: string | LocalStorageSetterFunction
  ) => {
    let newValue: string;
    if (typeof valueOrFn === "string") {
      newValue = valueOrFn;
    } else {
      const fn = valueOrFn;
      newValue = fn(localStorageValue);
    }

    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorageStateValue];
};
