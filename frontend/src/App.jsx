import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<LandingPage />} />
      <Route path="/*" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
