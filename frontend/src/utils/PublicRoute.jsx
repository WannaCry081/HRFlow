import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {

    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!(token === null || token === undefined)){
            setAuthenticated(true);
        }
    }, []);

    return (isAuthenticated) ? 
        <Navigate to="/dashboard/home" /> : element;
};

export default PublicRoute;