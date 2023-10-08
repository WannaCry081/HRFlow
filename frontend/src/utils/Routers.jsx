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
                accessId : 3,
                name: "Home",
                path: "/home",
                element: null
            },
            {
                accessId: 3,
                name: "Time Clock",
                path: "/applicant-tracking",
                element: null
            },
            {
                accessId: 1,
                name: "Applicant Tracking",
                path: "/applicant-tracking",
                element: null
            },
            {
                accessId: 1,
                name: "Employee Records",
                path: "/employee-records",
                element: null
            },
            {
                accessId : 3,
                name: "Employee Service",
                path: "/employee-service",
                element: null
            },
            {
                accessId : 3,
                name: "Notification",
                path: "/notification",
                element: null
            },
            {
                accessId : 3,
                name: "Profile",
                path: "/profile",
                element: null
            }
        ]
    }
];