import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/appcontext";
import { DEFAULT_APP_VAR } from "../constants";

interface UseAuthenticationState {
  error: string;
  accessToken: string;
  refreshToken: string;
  isUserSignedIn: boolean;
  signInUser: (credentials: {}) => void;
  signOutUser: VoidFunction;
}

const useAuthentication = (): UseAuthenticationState => {
  const [accessToken, setAccessToken] = useState<string>(null);
  const [refreshToken, setRefreshToken] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);
  const { appState, updateAppState } = useContext(AppContext);

  const signInUser = (credentials: {}) => {
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
