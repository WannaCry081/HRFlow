import { useLocation, useNavigate } from "react-router-dom";
import { FaBell, FaMoon } from "react-icons/fa6";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const formatRoute = (pathname) => {
        return pathname
            .split('/')
            .filter(Boolean)
            .map((segment) => {
                const words = segment.split('-');
                const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
                return capitalizedWords.join(' ');
            })
            .join(' / ');
    };
    const formattedRoute = formatRoute(location.pathname);


    return (
        <div className="h-28 flex items-end px-6 py-4 justify-between">
            <h1 className="text-xl text-gray-400 front-poppins font-semibold">{formattedRoute}</h1>
            <div className="flex gap-2">
                <div
                    onClick={() => navigate("/dashboard/notifications")} 
                    className="h-12 w-12 rounded-xl border flex items-center justify-center border-gray-200 bg-blush-pastel cursor-pointer">
                    <FaBell className="fill-blush" size={32} />
                </div>
                <div className="h-12 w-12 rounded-xl border flex items-center justify-center border-gray-200 bg-blush-pastel cursor-pointer">
                    <FaMoon className="fill-blush" size={32} />
                </div>
            </div>
        </div>
    );
};

export default Header;