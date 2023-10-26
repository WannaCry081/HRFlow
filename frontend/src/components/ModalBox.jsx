import { motion } from "framer-motion";

export const ModalBox = (prop) => {
    const handleSectionClick = (e) => {
        e.stopPropagation();
    };
    return (
        <motion.div 
            initial={{ opacity : 0 }}
            animate={{ opacity : 1 }}
            className="fixed z-10 h-screen w-screen top-0 left-0 bg-[#20262e80] p-4"
            onClick={prop.onCancel}>

            <motion.section 
                initial={{ translateY : -20 }}
                animate={{ translateY : 0 }}
                className={`${prop.top ? prop.top : "mt-40"} ${prop.topBreakpoint ? prop.topBreakpoint : "sm:mt-52"} max-w-[36rem] rounded-2xl bg-white mx-auto p-6 sm:p-10`} onClick={handleSectionClick}>
                {prop.children}
            </motion.section>
        </motion.div>
    );
};