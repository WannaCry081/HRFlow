import { useRef } from "react";
import Navbar from "./components/Navbar"
import Home from "./sections/Home";
import Services from "./sections/Services";
import About from "./sections/About"; 
import Contact from "./sections/Contact"; 
import Footer from "./sections/Footer"; 

const Landing = () => {
    document.title = "HR Flow | Streamline HR tasks";

    const sectionRefs = {
        homeRef: useRef(null),
        servicesRef: useRef(null),
        aboutRef: useRef(null),
        contactRef: useRef(null),
    };

    const menuItemClickHandler = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative w-screen overflow-x-hidden">
            <div className="absolute top-0 left-0 right-0 ">
                <Navbar
                    scrollIntoView={menuItemClickHandler}
                    sectionRefs={sectionRefs}
                />
            </div>
            <div className= "h-screen">
                <Home ref={sectionRefs.homeRef} scrollIntoView={menuItemClickHandler} sectionRefs={sectionRefs}/>
                <Services ref={sectionRefs.servicesRef} />
                <About ref={sectionRefs.aboutRef} />
                <Contact ref={sectionRefs.contactRef} />
                <Footer />
            </div>
        
        </div>
    );
};

export default Landing;
