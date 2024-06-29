import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageRoutes } from "./lib/constants";
import HomePage from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import { useContext } from "react";
import { AppContext } from "./lib/contexts/appcontext";
import ArchivedProjectsPage from "./pages/projects.archived.";

const App = () => {
  const { appState } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PageRoutes.Home}
          element={appState.isUserLoggedIn ? <HomePage /> : <SignInPage />}
        />
        <Route
          path={PageRoutes.Archives}
          element={
            appState.isUserLoggedIn ? <ArchivedProjectsPage /> : <SignInPage />
          }
        />
        <Route path={PageRoutes.Login} element={<SignInPage />} />
        <Route path={PageRoutes.SignUp} element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
