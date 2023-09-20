import React, { forwardRef } from "react";
import ComputerChild from "../../../assets/svg/ComputerChild.svg";

const Home = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="h-full flex justify-center relative ">
            <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row ">
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
                <div className="w-full self-center hidden lg:block justify-center">
                    <img
                        src={ComputerChild}
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    );
});

export default Home;
