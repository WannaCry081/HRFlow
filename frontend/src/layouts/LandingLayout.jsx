import { Routes, Route, Navigate } from "react-router-dom";
import { Routers } from "@Utils/Routers";

const LandingLayout = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        {Routers.map(
          ({ layout, pages }) =>
            layout === "Landing" &&
            pages.map(({ path, element }) => (
              <Route path={path} element={element} />
            ))
        )}
      </Routes>
    </>
  );
};

export default LandingLayout;
