import { EncodeBase64Aes, DecodeBase64Aes } from "../utils/encrypt";

interface UseLocalStorageState<T> {
  setValue: (key: string, value: T) => void;
  getValue: (key: string) => T | null;
  clearAll: VoidFunction;
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
    return JSON.parse(decodedValue);
  };

  const clearAll = () => {
    localStorage.clear();
  };

  return {
    getValue,
    setValue,
    clearAll,
  };
};

export default useLocalStorage;
