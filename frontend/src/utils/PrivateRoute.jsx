import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token !== null || token !== undefined) {
            setIsAuthenticated(true);
        }
    }, []);

    return isAuthenticated ? element : <Navigate to="/dashboard/home" />;
};

export default PrivateRoute;