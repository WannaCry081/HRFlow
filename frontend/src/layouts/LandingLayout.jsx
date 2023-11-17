import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "/src/routes";
import { useRef } from "react";
import  Navbar from "/src/pages/Landing/components/Navbar";

const LandingLayout = () => {

  const sectionRefs = {
    homeRef: useRef(null),
    servicesRef: useRef(null),
    aboutRef: useRef(null),
    contactRef: useRef(null),
  };

  const menuItemClickHandler = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative w-screen overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0">
        <Navbar
          scrollIntoView={menuItemClickHandler}
          sectionRefs={sectionRefs}
        />
      </div>
      <div className="h-screen">
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          {routes.map(
            ({ layout, pages }) =>
              layout === "Landing" &&
              pages.map(({ path, element }) => (
                <Route path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
    </main>
  );
};

export default LandingLayout;
