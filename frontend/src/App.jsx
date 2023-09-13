import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" index element={null} />
      <Route path="/*" element={null} />
    </Routes>
  );
};

export default App;
