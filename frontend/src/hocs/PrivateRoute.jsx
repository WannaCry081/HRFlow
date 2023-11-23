import { Navigate } from "react-router-dom";

const PrivateRoute = (prop) => {
    
    const token = sessionStorage.getItem("token");

    if (token !== null || token !== undefined) {
        return prop.element;
    }

    return <Navigate to="/auth/login" />

};

export default PrivateRoute;