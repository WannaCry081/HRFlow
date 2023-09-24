import { forwardRef } from "react";
import HumanTexting from "assets/svg/HumanTexting.svg";
import PurpleGradient from "assets/svg/Contact_purple.svg";

const Contact = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="h-full flex items-center justify-center py-24 xl:py-22 px-4 relative">
            <img
                src={PurpleGradient}    
                className="absolute -z-10 top-10 -left-20 md:top-0 xl:-top-16"
            />
            <div className="w-full max-w-screen-xl mx-auto flex h-full">
                <img
                    src={HumanTexting}
                    className="w-2/5 h-full mt-32 hidden md:block"
                />
                <div className="w-full h-full">
                    <h1 className="font-lato font-extrabold text-3xl text-jetblack py-2">
                        Contact Us
                    </h1>
                    <div className="bg-white h-full rounded-2xl shadow-lg py-6 px-4 flex flex-col gap-2.5 border border-gray-100">
                        <input
                            className="text-xs xl:text-sm rounded-md p-4 bg-gray-100 w-full focus:border focus:border-mistyBlue focus:outline-none font-normal"
                            placeholder="Name"
                        />
                        <input
                            className="text-xs xl:text-sm rounded-md p-4 bg-gray-100 w-full focus:border focus:border-mistyBlue focus:outline-none font-normal"
                            placeholder="Email"
                        />
                        <textarea
                            className="text-xs xl:text-sm resize-none h-full rounded-md p-4 bg-gray-100 w-full focus:border focus:border-mistyBlue focus:outline-none font-normal"
                            placeholder="Message"
                        />
                        <button className="bg-secondary-light text-sm md:text-base px-10 py-2.5 text-white font-semibold font-poppins rounded-lg shadow-lg mt-3">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Contact;