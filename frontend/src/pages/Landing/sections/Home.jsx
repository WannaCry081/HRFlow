import { forwardRef } from "react";
import { Link } from "react-router-dom";
import ComputerChild from "/src/assets/svg/ComputerChild.svg";
import PurpleGradient from "/src/assets/svg/Home_purple.svg";
import SkyblueGradient from "/src/assets/svg/Home_skyblue.svg";
import PinkGradient from "/src/assets/svg/Home_pink.svg";
import { motion } from "framer-motion";

const defaultVariant = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.15,
    },
  },
};

const Home = forwardRef((props, ref) => {
  const { sectionRefs } = props;
  const menuItemClickHandler = (refName) => {
    sectionRefs[refName].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        ref={ref}
        className="py-28 sm:py-44 flex justify-center relative"
      >
        <img
          src={PurpleGradient}
          className="absolute -z-30 top-[7rem] -right-20 md:top-18 xl:top-16 xl:-right-20 2xl:top-28 2xl:right-[14rem]"
        />
        <img
          src={SkyblueGradient}
          className=" absolute -z-20 bottom-[12rem] -right-20 md:bottom-[7rem]
                        xl:-bottom-16 xl:right-20 2xl:right-[22rem]"
        />
        <img
          src={PinkGradient}
          className="-z-10 absolute top-[12rem] -left-32 md:bottom-0 md:-left-44 xl:-left-0 xl:top-[16rem] 2xl:left-[22rem] 2xl:top-[18rem]"
        />
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row">
          <div className="flex flex-col h-full justify-center w-full pt-12 px-2 xl:px-4">
            <motion.div
              className="font-lato font-extrabold transition text-[3.4rem] sm:text-[4.1rem] md:text-6xl lg:text-[4.2rem] text-center xl:text-left xl:text-6xl 2xl:text-[4.2rem]"
              initial="hidden"
              animate="visible"
              variants={defaultVariant}
            >
              <motion.h1 className="leading-tight text-jetblack">
                Innovate HR,
              </motion.h1>
              <motion.h1 className="leading-tight text-jetblack">
                Elevate Workplaces,
              </motion.h1>
              <motion.h1 className="leading-tight text-jetblack">
                Empower Teams
              </motion.h1>
            </motion.div>
            <div className="text-center leading-tight">
              <motion.h2
                className="font-poppins py-8 text-2xl lg:text-[1.6rem] text-gray-700  transition px-4 lg:px-20 lg:py-10 xl:text-left xl:px-0"
                initial="hidden"
                animate="visible"
                variants={defaultVariant}
              >
                Streamline HR tasks, from recruitment to payroll, with our
                all-in-one HRIS.
              </motion.h2>
              <div className="flex gap-4 mt-2 justify-center xl:justify-start">
                <Link
                  to="/auth/register"
                  target="_blank"
                  className="bg-lilac sm:text-lg px-10 md:px-12 py-3.5 text-white font-semibold font-poppins rounded-lg shadow-lg lg:text-2xl xl:text-xl transition hover:bg-lilac-dark"
                >
                  Get Started
                </Link>
                <button
                  onClick={() => menuItemClickHandler("servicesRef")}
                  className="bg-lilac-pastel px-10 md:px-12 py-3.5 sm:text-lg text-lilac font-semibold font-poppins rounded-lg shadow-lg lg:text-2xl xl:text-xl hov transition hover:bg-tertiary-pastel"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="w-full self-center hidden xl:block">
            <img src={ComputerChild} className="w-full" />
          </div>
        </div>
      </section>
    </>
  );
});

export default Home;
