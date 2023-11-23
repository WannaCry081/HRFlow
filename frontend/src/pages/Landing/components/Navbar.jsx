import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import HRFlowLogo_Dark from "/src/assets/svg/HRFlowLogo_Dark.svg";

const Navbar = (props) => {
  const { sectionRefs } = props;
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const menuItemClickHandler = (refName) => {
    sectionRefs[refName].current.scrollIntoView({ behavior: "smooth" });
    toggleMenuHandler();
  };

  return (
    <nav className="fixed top-0 w-full bg-white z-50">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex mx-auto justify-between items-center w-full px-4">
          {/* Primary menu and logo */}
          <div className="flex items-center my-6">
            {/* logo */}
            <div>
              <Link
                to="/"
                onClick={() => menuItemClickHandler("homeRef")}
                className="flex gap-1 font-bold text-gray-700 items-center"
              >
                <img
                  src={HRFlowLogo_Dark}
                  alt="HR Flow Logo"
                  className="h-16"
                />
              </Link>
            </div>
          </div>
          {/* secondary */}
          <div className="flex gap-6">
            <div className=" xs:flex items-center gap-10 text-jetblack">
              <div className="hidden lg:flex items-center gap-8 2xl:gap-10 font-semibold text-lg 2xl:text-xl transition-all ease-in">
                <p
                  onClick={() => menuItemClickHandler("homeRef")}
                  className="hover:text-lilac-dark cursor-pointer"
                >
                  Home
                </p>
                <p
                  onClick={() => menuItemClickHandler("servicesRef")}
                  className="hover:text-lilac-dark cursor-pointer"
                >
                  Services
                </p>
                <p
                  onClick={() => menuItemClickHandler("aboutRef")}
                  className="hover:text-lilac-dark cursor-pointer"
                >
                  About
                </p>
                <p
                  onClick={() => menuItemClickHandler("contactRef")}
                  className="hover:text-lilac-dark cursor-pointer"
                >
                  Contact Us
                </p>
                <Link
                  to="/auth/login"
                  target="_blank"
                  className="bg-lilac px-8 py-1.5 2xl:px-10 2xl:py-2 rounded-full text-white hover:bg-lilac-dark cursor-pointer"
                >
                  Sign In
                </Link>
              </div>
            </div>
            {/* Mobile navigation toggle */}
            <div className="lg:hidden flex items-center">
              <button
                className="p-2 rounded-md hover:bg-gray-0"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                {toggleMenu ? (
                  <MdOutlineClose size={38} className="text-zinc-600 " />
                ) : (
                  <FiMenu size={38} className="text-zinc-600 " />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigation */}
      <div
        className={`fixed z-40 w-5/6 bg-lilac-pastel shadow-lg text-jetblack font-semibold rounded-3xl overflow-hidden flex flex-col px-6 lg:hidden gap-12 origin-top duration-1200 ${
          !toggleMenu ? "h-0" : "h-auto"
        } left-1/2 transform -translate-x-1/2 mt-2`}
      >
        <div className="py-8">
          <div className="text-gray-700 flex flex-col gap-8 w-full tracking-wide text-xl">
            <p
              onClick={() => menuItemClickHandler("homeRef")}
              className="hover:text-jetblack"
            >
              Home
            </p>
            <p
              onClick={() => menuItemClickHandler("servicesRef")}
              className="hover:text-jetblack"
            >
              Services
            </p>
            <p
              onClick={() => menuItemClickHandler("aboutRef")}
              className="hover:text-jetblack"
            >
              About
            </p>
            <p
              onClick={() => menuItemClickHandler("contactRef")}
              className="hover:text-jetblack"
            >
              Contact Us
            </p>
            <Link
              to="/auth/login"
              target="_blank"
              className="w-full bg-lilac rounded-full text-white py-3 hover:bg-lilac-dark"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      {/* mobile navigation */}
      <div
        className={`fixed z-40 w-5/6 bg-lilac-pastel shadow-lg text-jetblack font-semibold rounded-3xl overflow-hidden flex flex-col px-6 lg:hidden gap-12 origin-top duration-1200 ${
          !toggleMenu ? "h-0" : "h-auto"
        } left-1/2 transform -translate-x-1/2 mt-2`}
      >
        <div className="py-8">
          <div className="text-gray-700 flex flex-col gap-8 w-full tracking-wider">
            <p
              onClick={() => menuItemClickHandler("homeRef")}
              className="hover:text-jetblack"
            >
              Home
            </p>
            <p
              onClick={() => menuItemClickHandler("servicesRef")}
              className="hover:text-jetblack"
            >
              Services
            </p>
            <p
              onClick={() => menuItemClickHandler("aboutRef")}
              className="hover:text-jetblack"
            >
              About
            </p>
            <p
              onClick={() => menuItemClickHandler("contactRef")}
              className="hover:text-jetblack"
            >
              Contact Us
            </p>
            <Link
              to="/auth/login"
              target="_blank"
              className="w-full bg-lilac rounded-xl text-white py-2"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
