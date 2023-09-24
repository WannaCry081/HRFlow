import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<LandingPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/auth/register" element={<RegisterPage /> } />
      <Route path="/auth/login" element={<LoginPage /> } />
    </Routes>
  );
};

export default App;
