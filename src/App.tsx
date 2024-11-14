import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageRoutes } from "./lib/constants";
import HomePage from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import { useContext } from "react";
import { AppContext } from "./lib/contexts/appcontext";
import UserProfilePage from "./pages/user.profile";
import ProjectProfilePage from "./pages/project.profile";
import ProjectContractorPage from "./pages/project.contractor.page";
import ProjectDesignBriefPage from "./pages/project.design.brief.page";
import ProjectReportPage from "./pages/project.report.page";
import ForgotPasswordPage from "./pages/forget.password.page";
import PaymentsPage from "./pages/payments.page";
import AppliancesPage from "./pages/appliances.page";
import ProjectDocumentPage from "./pages/project.document.page";

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
          path={PageRoutes.Overview}
          element={
            appState.isUserLoggedIn ? <ProjectProfilePage /> : <SignInPage />
          }
        />
        <Route
          path={PageRoutes.Contractors}
          element={
            appState.isUserLoggedIn ? <ProjectContractorPage /> : <SignInPage />
          }
        />
        <Route
          path={PageRoutes.DesignBrief}
          element={
            appState.isUserLoggedIn ? <ProjectDesignBriefPage /> : <SignInPage />
          }
        />
        <Route
          path={PageRoutes.Appliances}
          element={
            appState.isUserLoggedIn ? <AppliancesPage /> : <SignInPage />
          }
        />
        <Route
          path={PageRoutes.Documents}
          element={
            appState.isUserLoggedIn ? <ProjectDocumentPage /> : <SignInPage />
          }
        />
        <Route
          path={PageRoutes.UserProfile}
          element={
            appState.isUserLoggedIn ? <UserProfilePage /> : <SignInPage />
          }
        />
        <Route
          path={PageRoutes.Payments}
          element={
            appState.isUserLoggedIn ? <PaymentsPage /> : <SignInPage />
          }
        />
        <Route
          path={PageRoutes.ProjectReports}
          element={
            appState.isUserLoggedIn ? <ProjectReportPage /> : <SignInPage />
          }
        />
        <Route path={PageRoutes.Login} element={<SignInPage />} />
        <Route path={PageRoutes.SignUp} element={<SignUpPage />} />
        <Route path={PageRoutes.ForgotPassword} element={<ForgotPasswordPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
