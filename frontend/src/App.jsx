import { Route, Routes } from "react-router-dom";
import { AuthLayout, DashboardLayout, LandingLayout } from "@Layouts";
import PrivateRoute from "@Utils/PrivateRoute";
import PublicRoute from "@Utils/PublicRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/*" index element={
        <PublicRoute element={<LandingLayout />} />
      } />
      <Route path="/auth/*" element={
        <PublicRoute element={<AuthLayout />} />
      } /> 
      <Route path="/dashboard/*" element={
        <PrivateRoute element={<DashboardLayout />} />
      } />
    </Routes>
  );
};

export default App;
