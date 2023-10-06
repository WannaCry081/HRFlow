import Group from "@Pages/Group";
import Login from "@Pages/Login";
import Register from "@Pages/Register";

export const routes = [
    { 
        title : "Landing Page",
        layout : "Landing",
        pages : [
            {
                name : "Landing",
                path : "/", 
                element : null
            }
        ] 
    },
    {
        title: "Auth Page",
        layout : "Auth",
        pages : [
            {   
                name: "Login",
                path: "/login",
                element: <Login />
            }, 
            {
                name: "Register",
                path: "/register",
                element : <Register />
            }
        ]
    },
    {
        title: "Dashboard Page",
        layout : "Dashboard",
        pages : [
            {
                title : "Human Resource",
                pages : [
                    {
                        name: "",
                        path: "",
                        element: null
                    },
                    {
                        name: "",
                        path: "",
                        element: null
                    }
                ]
            }, 
            {
                title : "Employee",
                pages : [
                    {
                        name: "",
                        path: "",
                        element: null
                    },
                    {
                        name: "",
                        path: "",
                        element: null
                    }
                ]
            }
        ]
    }
];