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

export const CircularProgressBar = (prop) => {
    return (
        <>
            <div className="relative animate-spin w-6 h-6 rounded-full border-2 border-primary-pastel border-t-primary-light"></div>
            {prop.children}
        </>
    );
  };