import { forwardRef } from "react";
import PinkGradient from "assets/svg/About_pink.svg";
import HumanRocket from "assets/svg/Human_rocket.svg";
import Rocket from "assets/svg/icons/Rocket.svg";
import Crown from "assets/svg/icons/Crown.svg";

const About = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="flex items-center justify-center relative pt-32 px-4 scroll-m-20">
            <div className="w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center transition">
                <img
                    src={PinkGradient}
                    className="absolute -z-10 top-0 sm:-top-10 -left-20 md:-top-10 md:-left-36 xl:top-[18rem] xl:left-[30rem] 2xl:-bottom-[10rem] 2xl:left-[50rem]"
                />
                <div className="w-full">
                    <div className="text-5xl font-extrabold font-lato text-jetblack">
                        About HR Flow
                    </div>
                    <p className="py-4 font-poppins text-xl leading-snug text-jetblack">
                        Welcome to HR Flow — Redefining HR Management. Our central hub streamlines HR processes for effortless workforce management.
                    </p>
                    <div className="w-full flex flex-col gap-8 py-4">
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
                    className="w-2/3 hidden xl:block"
                />
            </div>
        </section>
    );
});

const AboutItem = ( props ) => {
    return (
        <div className="flex gap-3">
            <div className="h-16 w-16 bg-tertiary-pastel border border-gray-300 rounded-xl">
                <img
                    src={ props.icon }
                    className="p-2"
                />
            </div>
            <div className="w-4/5">
                <h1 className="font-lato font-extrabold text-jetblack text-lg">
                    { props.title }
                </h1>
                <p className="text-xs leading-normal font-poppins text-jetblack">
                    { props.body }
                </p>
            </div>
        </div>
    );
};

export default About;

