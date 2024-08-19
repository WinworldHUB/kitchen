import { EncodeBase64Aes, DecodeBase64Aes } from "../utils/encrypt.utils";

interface UseLocalStorageState<T> {
  setValue: (key: string, value: T) => void;
  getValue: (key: string) => T | null;
  clearAll: VoidFunction;
  removeValue: (key: string) => void;
}

const useLocalStorage = <T,>(): UseLocalStorageState<T> => {
  const setValue = (key: string, value: T) => {
    const encodedValue = EncodeBase64Aes(JSON.stringify(value));
    localStorage.setItem(key, encodedValue);
  };

  const getValue = (key: string): T | null => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    const decodedValue = DecodeBase64Aes(value);
    if (value === decodedValue) localStorage.removeItem(key);

    return JSON.parse(decodedValue);
  };

  const clearAll = () => {
    localStorage.clear();
  };

  const removeValue = (key: string) => {
    localStorage.removeItem(key);
  }

  return {
    getValue,
    setValue,
    clearAll,
    removeValue,
  };
};

export default useLocalStorage;
