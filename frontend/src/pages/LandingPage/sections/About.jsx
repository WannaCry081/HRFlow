import React, { forwardRef } from "react";

const About = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="bg-blue-100 h-full flex items-center justify-center" >
            About
        </section>
    );
});

export default About;