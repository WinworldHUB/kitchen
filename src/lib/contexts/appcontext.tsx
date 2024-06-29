import { createContext } from "react";
import useApp from "../hooks/useApp";

const AppContext = createContext<AppState>(null);

const AppContextProvider = ({ children }: ComponentProps) => {
  return <AppContext.Provider value={useApp()}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
