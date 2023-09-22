import React, { forwardRef } from "react";
import PinkGradient from "../../../assets/svg/About_pink.svg";
import HumanRocket from "../../../assets/svg/Human_rocket.svg";
import Rocket from "../../../assets/svg/icons/Rocket.svg";
import Crown from "../../../assets/svg/icons/Crown.svg";

const AboutItem = ({ icon, title, body }) => {
    return (
        <div className="flex gap-3">
            <div className="h-16 w-16 bg-pastel-tertiary border border-gray-300 rounded-xl">
                <img
                    src={ icon }
                    className="p-2"
                />
            </div>
            <div className="w-4/5">
                <h1 className="font-lato font-extrabold text-jetblack text-lg">
                    { title }
                </h1>
                <p className="text-xs leading-normal font-poppins text-jetblack">
                    { body }
                </p>
            </div>
        </div>
    )
}

const About = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="flex items-center justify-center relative py-8 px-4">
            <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center">
                <img
                    src={PinkGradient}
                    className="absolute -z-10 right-0 top-12"
                />
                <div className="w-full">
                    <div className="text-4xl font-extrabold font-lato text-jetblack">
                        About HR Flow
                    </div>
                    <p className="py-4 font-poppin text-jetblack">
                        Welcome to HR Flow, where HR management is redefined. Our web application serves as the central hub for all your HR needs, streamlining processes and simplifying workforce management.
                    </p>
                    <div className="w-full flex flex-col gap-4 py-4">
                        <AboutItem 
                            icon={Rocket}
                            title="Empowering HR Efficiency"
                            body="HR Flow streamlines HR with data management and task automation. Our platform covers employee data, automates payroll, benefits, and time tracking, improving accuracy and efficiency."
                        />
                        <AboutItem 
                            icon={Crown}
                            title="Your Trusted HR Partner"
                            body="We're dedicated to simplifying HR operations, boosting accuracy, and enhancing productivity. HR Flow is your ally in efficient HR management."
                        />
                    </div>
                </div>
                <img
                    src={HumanRocket}
                    className="w-1/3 hidden xl:block"
                />
            </div>
        </section>
    );
});

export default About;

