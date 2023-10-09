import { Route, Routes } from "react-router-dom";
import Auth from "@Layouts/Auth";
import Dashboard from "@Layouts/Dashboard";
import Landing from "@Pages/Landing"; 

const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<Landing />} />
      <Route path="/auth/*" element={<Auth />} /> 
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
