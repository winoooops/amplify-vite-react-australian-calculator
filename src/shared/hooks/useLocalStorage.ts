import { useState } from "react";

type DispatchAction<T> = T | ((prev: T) => T);

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const getItem = <T>(key: string): T | undefined => {
    try {
      const data = window.localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // function to set the value to the local storage
  const setItem = <T>(key: string, value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }

  const removeItem = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    }
    catch (error) {
      console.error(error);
    }
  }

  // function to dispatch the value to both the local storage and the state
  const handleDispatch = (action: DispatchAction<T>) => {
    if (typeof action === "function") {
      setValue((prev) => {
        const newValue = (action as (prev: T) => T)(prev);
        setItem(key, newValue);
        return newValue;
      })
    } else {
      setItem(key, action);
      setValue(action);
    }
  }

  const clearState = () => {
    setValue(undefined as T);
    removeItem(key);
  }

  const [value, setValue] = useState(() => {
    const data = getItem(key);
    return (data || initialValue) as T;
  })

  return [value, handleDispatch, clearState] as const;
}