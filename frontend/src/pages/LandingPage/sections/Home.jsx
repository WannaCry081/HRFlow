import React, { forwardRef } from "react";
import ComputerChild from "../../../assets/svg/ComputerChild.svg";
import PurpleGradient from "../../../assets/svg/Home_purple.svg";
import SkyblueGradient from "../../../assets/svg/Home_skyblue.svg";
import PinkGradient from "../../../assets/svg/Home_pink.svg";

const Home = forwardRef((props, ref) => {
    return (
        <>
            <section ref={ref} className="h-full flex justify-center relative">
                    <img
                        src={PurpleGradient}
                        className="absolute -z-30 top-[7rem] -right-20 md:top-10 xl:top-5 xl:right-0"
                    />
                    <img
                        src={SkyblueGradient}
                        className=" absolute -z-20 bottom-[4rem] -right-20 md:-bottom-28
                        xl:-bottom-20 xl:right-20"
                    />
                    <img
                        src={PinkGradient}
                    className="-z-10 absolute top-[12rem] -left-32 md:bottom-0 md:-left-44  xl:left-[10rem] xl:top-40"
                    />
                <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row">
                    <div className="flex flex-col h-full justify-center w-full pt-12 px-2 xl:px-0">
                        <div className="font-lato font-bold text-[42px] md:text-[60px] text-center lg:text-left">
                            <h1 className="leading-tight text-jetblack">
                                Nurturing HR,
                            </h1>
                            <h1 className="leading-tight text-jetblack">
                                Enhancing Workplaces,
                            </h1>
                            <h1 className="leading-tight  text-jetblack">
                                Empowering Employees
                            </h1>
                        </div>
                        <div className="text-center lg:text-left leading-tight">
                            <h2 className="font-poppins py-4">
                                Streamline HR tasks, from recruitment to payroll, with our all-in-one HRIS.
                            </h2>
                            <div className="flex gap-3 mt-2 justify-center lg:justify-start">
                                <button className="bg-primary-light text-sm md:text-base px-8 py-2.5 text-white font-semibold font-poppins rounded-lg shadow-lg">
                                    Get Started
                                </button>
                                <button className="bg-pastel-primary px-8 py-2.5 text-sm md:text-base text-primary-light font-semibold font-poppins rounded-lg shadow-lg">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full self-center hidden lg:block">
                        <img
                            src={ComputerChild}
                            className="w-full"
                        />
                    </div>
                </div>
            </section>
        </>
        
    );
});

export default Home;
