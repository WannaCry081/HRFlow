import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "@Utils/Routers";
import NavBar from "@Components/NavBar";

const Dashboard = () => {
    document.title = "HR Flow | Dashboard";

    // Decrypt the jwt token then destructor the 
    // router depending the title of routers

    return (
        <main className="h-screen w-screen flex">
            <NavBar routes={routes} />
            <section>
                <Routes>
                    <Route path="*" element={<Navigate to="/dashboard/home" replace/>} />
                    {routes.map(({ layout, pages }) =>
                        layout === "Dashboard" &&
                        pages.map(({ path, element }) => (
                            <Route exact path={path} element={element} />
                        ))
                    )}
                </Routes>
            </section>
        </main>
    );
};

export default Dashboard;