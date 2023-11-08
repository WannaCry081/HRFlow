import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "@Utils/Routers";
import NavBar from "@Components/NavBar";
import { useNavigate } from "react-router-dom";
import { GetUserProfileApi } from "@Services/userService.js";
import Header from "@Components/Header";

const Dashboard = () => {
    document.title = "HR Flow | Dashboard";

    const navigate = useNavigate();
    const [userData, setUserData ] = useState({});

    useEffect(() => {
        const token = sessionStorage.getItem("token");  
        if (token === undefined || token === null) {
            navigate("/auth/login", { replace : true });
        }

        const getUserProfile = async () => {
            const {status, data} = await GetUserProfileApi(token);
            setUserData(data);
        };

        getUserProfile();
    }, []);

    return (
        <main className="h-screen w-screen flex">
            <NavBar routes={routes} userData={userData}/>
            <section className="w-full flex flex-col bg-gray-50">
                <Header />
                <div className="flex-grow ">
                    <Routes>
                        <Route path="*" element={<Navigate to="/dashboard/home" replace/>} />
                        {routes.map(({ role, layout, pages }) =>
                            layout === "Dashboard" && 
                            role === userData.role &&
                            pages.map(({ path, element }) => (
                                <Route exact path={path} element={element} />
                            ))
                        )}
                        {routes.map(({ layout, pages }) => 
                            layout === "Common" && 
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