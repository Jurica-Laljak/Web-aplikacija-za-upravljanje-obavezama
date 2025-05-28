import { useState } from "react";

type LocalStorageSetterFunction<T> = {
  description?: string;
  (currentValue: Array<T> | Object): Array<T> | Object;
};

export function useParseLocalStorage<T = string>(
  key: string,
  defaultValue?: Array<T> | Object
): [
  any,
  (valueOrFn: Array<T> | Object | LocalStorageSetterFunction<T>) => void
] {
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
    valueOrFn: Array<T> | Object | LocalStorageSetterFunction<T>
  ) => {
    let newValue: Object;
    if (typeof valueOrFn === "object") {
      newValue = valueOrFn;
    } else {
      const fn = valueOrFn;
      newValue = fn(localStorageValue);
    }

    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorageStateValue];
}
