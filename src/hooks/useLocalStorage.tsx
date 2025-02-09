import { useState, useEffect } from 'react';
export interface LocalStorageType {
  value: string;
  setValue: (value: string) => void;
  getValue: () => string;
  storagename: (value: string) => string;
  setStoragename: (value: string) => void;
}

function useLocalStorage(name: string, key: string): LocalStorageType {
  const getValue: LocalStorageType['getValue'] = () => {
    const getName = localStorage.getItem(key);
    if (getName) {
      return getName;
    }
    return name;
  };
  const [value, setValue] = useState<LocalStorageType['value']>(getValue);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  return {
    value,
    setValue,
    getValue,
    storagename: getValue,
    setStoragename: setValue,
  };
}

export { useLocalStorage };
