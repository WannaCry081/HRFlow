import { Navigate } from "react-router-dom";

const PrivateRoute = (prop) => {
    
    const token = sessionStorage.getItem("token");

    if (token === null || token === undefined) {
        return prop.element;
    }

    return <Navigate to="/dashboard/home" />

};

export default PrivateRoute;