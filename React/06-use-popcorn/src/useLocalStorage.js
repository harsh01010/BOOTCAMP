import { useEffect, useState } from "react";
export function useLocalStorage(initialStorageState, key) {
  const [value, setValue] = useState(function () {
    const storedVal = localStorage.getItem(key);
    return storedVal ? JSON.parse(storedVal) : initialStorageState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
