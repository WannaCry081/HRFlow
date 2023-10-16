import Login from "@Pages/Login";
import Register from "@Pages/Register";
import Home from "@Pages/Home";
import ApplicantTracking from "@Pages/ApplicantTracking";
import EmployeeRecord from "@Pages/EmployeeRecord";
import EmployeeService from "@Pages/EmployeeService";
import Notifications from "@Pages/Notifications";
import TimeClock from "@Pages/TimeClock";
import Profile from "@Pages/Profile";
import {
    BiHomeAlt,
    BiCalendar,
    BiUser, 
    BiNotification,
    BiNotepad,
    BiTime,
    BiSitemap,
    BiPieChartAlt2
} from "react-icons/bi";

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
        role : "Employee",
        title: "Dashboard Page",
        layout : "Dashboard",
        pages : [
            {
                icon: <BiPieChartAlt2 size={24} className="group-hover:fill-primary-light" />,
                name: "Dashboard",
                path: "/home",
                element: <Home />
            },
            {
                icon: <BiTime size={24} className="group-hover:fill-primary-light" />,
                name: "Time Clock",
                path: "/time-clock",
                element: <TimeClock />
            },
            {
                icon: <BiNotification size={24} className="group-hover:fill-primary-light" />,
                name: "Notifications",
                path: "/notifications",
                element: <Notifications />
            },
            {
                icon: <BiUser size={24} className="group-hover:fill-primary-light" />,
                name: "Profile",
                path: "/profile",
                element: <Profile />
            }
        ]
    }, 
    {
        role : "Human Resource", 
        title : "Dashboard Page",
        layout : "Dashboard",
        pages : [
            {
                icon: <BiPieChartAlt2 size={24} className="group-hover:fill-primary-light" />,
                name: "Dashboard",
                path: "/home",
                element: <Home />
            },
            {
                icon: <BiTime size={24} className="group-hover:fill-primary-light" />,
                name: "Time Clock",
                path: "/time-clock",
                element: <TimeClock />
            },
            {
                icon: <BiCalendar size={24} className="group-hover:fill-primary-light" />,
                name: "Applicant Tracking",
                path: "/applicant-tracking",
                element: <ApplicantTracking />
            },
            {
                icon: <BiNotepad size={24} className="group-hover:fill-primary-light" />,
                name: "Employee Records",
                path: "/employee-records",
                element: <EmployeeRecord />
            },
            {
                icon: <BiSitemap size={24} className="group-hover:fill-primary-light" />,
                name: "Employee Service",
                path: "/employee-service",
                element: <EmployeeService />
            },
            {
                icon: <BiNotification size={24} className="group-hover:fill-primary-light" />,
                name: "Notifications",
                path: "/notifications",
                element: <Notifications />
            },
            {
                icon: <BiUser size={24} className="group-hover:fill-primary-light" />,
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
                name : "Help",
                path : "/help",
                element : null
            },
            {
                name :  "Settings",
                path : "/settings",
                element : null
            }
        ]
    }
];