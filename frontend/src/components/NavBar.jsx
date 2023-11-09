import { GoKebabHorizontal } from "react-icons/go";
import { Link } from "react-router-dom";
import HRFlowLogoLightSvg from "@Assets/svg/HRFlowLogo_Light.svg"; 
import useToggle from "@Hooks/useToggle";
import { motion } from "framer-motion";
import { useState } from "react";

const NavBar = (prop) => {
    const [item, setItem] = useState(0);
    const [show, onSetShow] = useToggle();
    const userData = prop.userData;

    return (
        <nav className="p-6 w-96 relative flex flex-col shadow-md">
            <div className="pb-4">
                <img src={HRFlowLogoLightSvg} className="h-12 sm:h-16" alt="HR Flow Logo" />
            </div>
            <div className="flex-grow py-4 line-above">
                {prop.routes.map(({ role, layout, pages }) =>
                    layout === "Dashboard" && 
                    role === userData.role &&
                    pages.map(({ icon, name, path }, key) => (
                        <Link to={`/dashboard${path}`} onClick={() => setItem(key)}>
                            <span className={`${ (key == item) ? "fill-primary-light bg-primary-pastel text-primary-light" : ""  } flex gap-2 hover:text-primary-light hover:fill-primary-light rounded-md p-4 hover:bg-primary-pastel mb-2 font-medium`}>
                                {icon} {name}
                            </span>
                        </Link>
                    ))
                )}
            </div>
            <div className="flex justify-between items-center pt-6 line-above">
                <span className="flex gap-2 items-center">
                    <div className="bg-primary-pastel h-12 w-12 rounded-lg text-primary-light flex items-center justify-center font-semibold font-poppins text-xl shadow-inner">
                        {userData.firstName !== undefined ? userData.firstName[0].toUpperCase() : ""}
                        {userData.lastName !== undefined ? userData.lastName[0].toUpperCase() : ""}
                    </div>
                    <span>
                        <h1 className="font-lato font-semibold">
                            {`${userData.lastName}, ${userData.firstName} ${userData.middleName === "" && userData.middleName.length > 0 ? userData.middleName[0].toUpperCase() + "." : ""} ${userData.suffix}`}
                        </h1>
                        <p className="text-xs font-poppins">{userData.companyEmail}</p>
                    </span>
                </span>
                <p className="relative font-medium">
                    {show && (
                        <motion.div 
                            initial={{translateY : 20}}
                            animate={{translateY : 0}}
                            className="absolute -top-[11.5rem] -left-[9.5rem] rounded-lg border bg-white font-poppins w-48">
                            <Link to="/dashboard/profile" onClick={onSetShow}>
                                <span className="block p-4 hover:bg-primary-pastel hover:text-primary-light rounded-t-lg">
                                    Profile
                                </span>
                            </Link>
                            <Link to="/dashboard/settings" onClick={onSetShow}>
                                <span className="block p-4 hover:bg-primary-pastel hover:text-primary-light">
                                    Settings
                                </span>
                            </Link>
                            <Link to="/auth/login" onClick={() => sessionStorage.clear()} replace>
                                <span className="block p-4 hover:bg-primary-pastel rounded-b-lg text-secondary-light font-bold">
                                    Log out
                                </span>
                            </Link>
                        </motion.div>
                    )}
                    <GoKebabHorizontal size={40} onClick={onSetShow} className="p-2 hover:bg-gray-200 rounded-full cursor-pointer transition-in"/>
                </p>
            </div>           
        </nav>
    );
};

export default NavBar;