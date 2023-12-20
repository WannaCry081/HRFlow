import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoKebabHorizontal } from "react-icons/go";
import { Separator } from "/src/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "/src/components/ui/dropdown-menu";
import HRFlowLogoLightSvg from "/src/assets/svg/HRFlowLogo_Light.svg";

const NavBar = (prop) => {
  const [item, setItem] = useState(0);
  const userData = prop.userData;
  const navigate  = useNavigate();

  return (
    <nav className="hidden p-6 w-96 relative md:flex flex-col shadow-md">
      <div className="space-y-4">
        <img
          src={HRFlowLogoLightSvg}
          className="h-12 sm:h-16"
          alt="HR Flow Logo"
        />
        <Separator />
      </div>
      <div className="flex-grow py-4">
        {prop.routes.map(
          ({ role, layout, pages }) =>
            layout === "Dashboard" &&
            role === userData.role &&
            pages.map(({ icon, name, path }, key) => (
              <Link
                key={key}
                to={`/dashboard${path}`}
                onClick={() => setItem(key)}
              >
                <span
                  className={`${key == item ? "fill-lilac bg-lilac-pastel text-lilac" : ""
                    } flex gap-2 hover:text-lilac hover:fill-lilac rounded-md p-4 hover:bg-primary-pastel mb-2 font-medium`}
                >
                  {icon} {name}
                </span>
              </Link>
            ))
        )}
      </div>
      <Separator />
      <div className="flex justify-between items-center pt-4">
        <span className="flex gap-2 items-center">
          <div className="bg-lilac-pastel h-12 w-12 rounded-lg text-lilac flex items-center justify-center font-semibold font-poppins text-xl shadow-inner">
            {userData.firstName !== undefined
              ? userData.firstName[0].toUpperCase()
              : ""}
            {userData.lastName !== undefined
              ? userData.lastName[0].toUpperCase()
              : ""}
          </div>
          <span>
            <h1 className="font-lato font-semibold">
              {`${userData.lastName}, ${userData.firstName} ${userData.middleName === "" && userData.middleName.length > 0
                  ? userData.middleName[0].toUpperCase() + "."
                  : ""
                } ${userData.suffix}`}
            </h1>
            <p className="text-xs font-poppins">{userData.companyEmail}</p>
          </span>
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <GoKebabHorizontal
              size={40}
              className="p-2 hover:bg-gray-100 transition duration-200 ease-linear rounded-full cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-base font-medium">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base font-medium">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                sessionStorage.clear("token");
                navigate("/", { replace: true });
              }}
              className="text-base font-medium text-red-500">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;
