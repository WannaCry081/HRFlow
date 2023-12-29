import { Route, Routes } from "react-router-dom";
import { AuthLayout, DashboardLayout, LandingLayout } from "/src/layouts";
import { PublicRoute, PrivateRoute } from "/src/hocs";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoute element={<LandingLayout />} />} />
      <Route
        path="/auth/*"
        element={<PublicRoute element={<AuthLayout />} />}
      />
      <Route
        path="/dashboard/*"
        element={<PrivateRoute element={<DashboardLayout />} />}
      />
    </Routes>
  );
};

export default App;
