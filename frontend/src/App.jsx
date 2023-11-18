import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthLayout, DashboardLayout, LandingLayout } from "/src/layouts";
// import { PublicRoute, PrivateRoute } from "/src/hocs";

const App = () => {
  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/*" index element={<LandingLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} /> 
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </React.Suspense>
  );
};

export default App;
