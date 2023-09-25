import React, { forwardRef } from "react";
import HumanTexting from "assets/svg/HumanTexting.svg";
import PurpleGradient from "assets/svg/Contact_purple.svg";

const Contact = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="flex items-center justify-center py-20 px-4 relative">
            <img
                src={PurpleGradient}    
                className="absolute -z-10 top-10 -left-20 md:top-0 xl:-top-16"
            />
            <div className="w-full max-w-screen-2xl mx-auto flex h-full gap-10">
                <img
                    src={HumanTexting}
                    className="w-1/5  hidden 2xl:block"
                />
                <div className="w-full h-2/5 transition">
                    <h1 className="font-lato font-extrabold text-4xl text-jetblack py-3 transition">
                        Contact Us
                    </h1>
                    <div className="bg-white text-xl font-poppins rounded-2xl shadow-lg py-6 px-4 flex flex-col gap-2.5 border border-gray-100 transition">
                        <input
                            className="rounded-md p-4 transition bg-gray-100 w-full focus:border focus:border-gray-400 focus:outline-none font-normal"
                            placeholder="Subject"
                        />
                        <input
                            className="rounded-md p-4 transition bg-gray-100 w-full focus:border focus:border-gray-400 focus:outline-none font-normal"
                            placeholder="Email"
                        />
                        <textarea
                            className="resize-none transition rounded-md p-4 bg-gray-100 w-full focus:border focus:border-gray-400 focus:outline-none font-normal h-52"
                            placeholder="Message"
                        />
                        <button className="bg-secondary-light hover:bg-secondary-dark text-xl px-10 py-3 text-white font-semibold font-poppins rounded-lg shadow-lg mt-3">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
          
           
        </section>
    );
});

export default Contact;