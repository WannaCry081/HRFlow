import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<LandingPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/auth/register" element={<RegisterPage /> } />
      <Route path="/auth/login" element={<LoginPage /> } />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage /> } />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default App;
