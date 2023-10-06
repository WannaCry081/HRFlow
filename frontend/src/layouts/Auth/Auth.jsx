import { Routes, Route, Link, Navigate } from "react-router-dom";
import { routes } from "../../utils/Routers";
import HRFlowLogo_Dark from "@Assets/svg/HRFlowLogo_Dark.svg";

const Auth = () => {
    return (
        <main className="h-screen w-screen relative">
            <div className=" relative px-4 py-6 sm:px-6">   
                <Link to="/">
                    <img
                        src={HRFlowLogo_Dark}
                        alt="HR Flow Logo"
                        className="h-12 sm:h-16"
                    />
                </Link>
            </div>
            <section className="relative px-6">
                <Routes>
                    <Route path="*" element={<Navigate to="/auth/login" replace />} />
                    {routes.map(({ layout, pages }) =>
                        layout === "Auth" &&
                        pages.map(({ path, element }) => (
                            <Route exact path={path} element={element} />
                        ))
                    )}
                </Routes>
            </section>
        </main>
    );
};

export default Auth;