import Landing from "@Pages/Landing";
import { Login, Register } from "@Pages/Auth";
import {
  Home,
  ApplicantTracking,
  EmployeeRecord,
  EmployeeService,
  Notifications,
  TimeClock,
  Profile,
  Department
} from "@Pages/Dashboard";
import {
  BiCalendar,
  BiUser,
  BiNotification,
  BiNotepad,
  BiTime,
  BiSitemap,
  BiPieChartAlt2,
  BiBuildings
} from "react-icons/bi";

export const Routers = [
  {
    title: "Landing Page",
    layout: "Landing",
    pages: [
      {
        name: "Welcome",
        path: "/",
        element: <Landing />,
      },
      {
        name: "Welcome",
        path: "/home",
        element: <Landing />,
      },
    ],
  },
  {
    title: "Auth Page",
    layout: "Auth",
    pages: [
      {
        name: "Login",
        path: "/login",
        element: <Login />,
      },
      {
        name: "Register",
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    role: "Employee",
    title: "Dashboard Page",
    layout: "Dashboard",
    pages: [
      {
        icon: <BiPieChartAlt2 size={24} className="fill-inherit" />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <BiTime size={24} className="fill-inherit" />,
        name: "Time Clock",
        path: "/time-clock",
        element: <TimeClock />,
      },
      {
        icon: <BiNotification size={24} className="fill-inherit" />,
        name: "Notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <BiUser size={24} className="fill-inherit" />,
        name: "Profile",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    role: "Human Resource",
    title: "Dashboard Page",
    layout: "Dashboard",
    pages: [
      {
        icon: <BiPieChartAlt2 size={24} className="fill-inherit" />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <BiTime size={24} className="fill-inherit" />,
        name: "Time Clock",
        path: "/time-clock",
        element: <TimeClock />,
      },
      {
        icon: <BiCalendar size={24} className="fill-inherit" />,
        name: "Applicant Tracking",
        path: "/applicant-tracking",
        element: <ApplicantTracking />,
      },
      {
        icon: <BiNotepad size={24} className="fill-inherit" />,
        name: "Employee Records",
        path: "/employee-records",
        element: <EmployeeRecord />,
      },
      {
        icon: <BiSitemap size={24} className="fill-inherit" />,
        name: "Employee Service",
        path: "/employee-service",
        element: <EmployeeService />,
      },
      {
        icon: <BiBuildings size={24} className="fill-inherit" />,
        name: "Department",
        path: "/department",
        element: <Department />,
      },
      {
        icon: <BiNotification size={24} className="fill-inherit" />,
        name: "Notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <BiUser size={24} className="fill-inherit" />,
        name: "Profile",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    title: "Common Pages",
    layout: "Common",
    pages: [
      {
        name: "Help",
        path: "/help",
        element: null,
      },
      {
        name: "Settings",
        path: "/settings",
        element: null,
      },
    ],
  },
];
