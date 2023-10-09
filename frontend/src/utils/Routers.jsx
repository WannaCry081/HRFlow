import Login from "@Pages/Login";
import Register from "@Pages/Register";
import Home from "@Pages/Home";
import ApplicantTracking from "@Pages/ApplicantTracking";
import EmployeeRecord from "@Pages/EmployeeRecord";
import EmployeeService from "@Pages/EmployeeService";
import Notifications from "@Pages/Notifications";
import TimeClock from "@Pages/TimeClock";
import Profile from "@Pages/Profile";

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
                element: <Home />
            },
            {
                accessId: 3,
                name: "Time Clock",
                path: "/time-clock",
                element: <TimeClock />
            },
            {
                accessId: 1,
                name: "Applicant Tracking",
                path: "/applicant-tracking",
                element: <ApplicantTracking />
            },
            {
                accessId: 1,
                name: "Employee Records",
                path: "/employee-records",
                element: <EmployeeRecord />
            },
            {
                accessId : 3,
                name: "Employee Service",
                path: "/employee-service",
                element: <EmployeeService />
            },
            {
                accessId : 3,
                name: "Notifications",
                path: "/notifications",
                element: <Notifications />
            },
            {
                accessId : 3,
                name: "Profile",
                path: "/profile",
                element: <Profile />
            }
        ]
    }, 
    {
        title : "Common Pages",
        layout : "Common", 
        pages : [
            {
                name :  "Settings",
                path : "/settings",
                element : null
            },
            {
                name : "Help",
                path : "/help",
                element : null
            }
        ]
    }
];