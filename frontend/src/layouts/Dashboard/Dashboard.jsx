import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "@Utils/Routers";
import NavBar from "@Components/NavBar";
import Header from "@Components/Header";

const Dashboard = () => {
    document.title = "HR Flow | Dashboard";

    // Decrypt the jwt token then destructor the 
    // router depending the title of routers

    return (
        <main className="h-screen w-screen flex">
            <NavBar routes={routes} />
            <section className="w-full flex flex-col bg-gray-50">
                <Header />
                <div className="flex-grow overflow-y-auto">
                    <Routes>
                        <Route path="*" element={<Navigate to="/dashboard/home" replace/>} />
                        {routes.map(({ layout, pages }) =>
                            layout === "Dashboard" &&
                            pages.map(({ path, element }) => (
                                <Route exact path={path} element={element} />
                            ))
                        )}
                    </Routes>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;