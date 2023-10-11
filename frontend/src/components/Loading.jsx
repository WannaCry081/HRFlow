import { motion } from "framer-motion";

export const ProgressBar = (prop) => {
    return (
        <motion.div 
            initial={{width : 0}}
            animate={{width : "100vw"}} 
            transition={{duration: prop.duration}}
            onAnimationComplete={prop.onAnimationComplete}
            className="fixed z-10 bg-primary-dark h-[.3rem] left-0 top-0">
        </motion.div>
    );
};

