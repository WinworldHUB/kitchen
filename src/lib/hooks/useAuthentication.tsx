import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/appcontext";
import { DEFAULT_APP_VAR, DEFAULT_LOCAL_STORAGE_KEY_FOR_USER_STATE } from "../constants";
import useLocalStorage from "./useLocalStorage";

interface UseAuthenticationState {
  error: string;
  accessToken: string;
  refreshToken: string;
  isUserSignedIn: boolean;
  signInUser: (credentials: User, appState:AppVars) => void;
  signOutUser: VoidFunction;
}

const useAuthentication = (): UseAuthenticationState => {
  const { setValue: setUserState } = useLocalStorage<User>();
  const [accessToken, setAccessToken] = useState<string>(null);
  const [refreshToken, setRefreshToken] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);
  const { updateAppState } = useContext(AppContext);

  useEffect(() => {
    setAccessToken("");
    setRefreshToken("");
    setError("");
    setIsUserSignedIn(false);
  }, []);

  const signInUser = (credentials: User, appState: AppVars) => {
    setUserState(DEFAULT_LOCAL_STORAGE_KEY_FOR_USER_STATE, credentials);
    updateAppState({ ...appState, isUserLoggedIn: true });
  };
  const signOutUser = () => { 
    updateAppState(DEFAULT_APP_VAR);
  };

  return {
    accessToken,
    refreshToken,
    isUserSignedIn,
    error,
    signInUser,
    signOutUser,
  };
};

export default useAuthentication;
