import { GoKebabHorizontal } from "react-icons/go";
import { Link } from "react-router-dom";


const NavBar = (prop) => {
    return (
        <nav className="shadow-xl p-6 w-80 relative flex flex-col">
            <div className="pb-4">
                <h1 className="text-4xl font-bold">Logo</h1>
            </div>
            <div className="flex-grow line-above py-6">
                {prop.routes.map(({ layout, pages }) => 
                    <ul className="">   
                        {layout === "Dashboard" && 
                            pages.map(({ name, path }, key) => (
                                <li className="block font-poppins py-2 text-lg">
                                    <Link key={key} to={`/dashboard${path}`}>{name}</Link>
                                </li>
                        ))}   
                    </ul>
                )}
            </div>
            <div className="line-above py-4">
                {prop.routes.map(({ layout, pages }) => 
                    <ul className="">
                        {
                            layout === "Common" && 
                            pages.map(({ name, path }, key) => (
                                <li className="block font-poppins py-2 text-lg">
                                    <Link key={key} to={`/dashboard${path}`}>{name}</Link>
                                </li>
                            ))
                        }   
                    </ul>
                )}
            </div>
            <div className="flex justify-between items-center pt-6 line-above">
                <span className="flex gap-4 items-center">
                    <div className="bg-gray-400 h-10 w-10 rounded-full">
                    </div>
                    <span>
                        <h1 className="font-lato font-semibold">Name Surname</h1>
                        <p className="text-xs font-poppins">Email Address</p>
                    </span>
                </span>
                <p className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
                    <GoKebabHorizontal size={24} />
                </p>
            </div>           
        </nav>
    );
};

export default NavBar;