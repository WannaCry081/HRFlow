import { motion } from "framer-motion";

const FeatureCard = (props) => {
    return (
        <motion.div 
            className="border-[0.5px] border-gray-200 shadow-lg rounded-3xl px-4 xl:p-6 transition h-[22rem] md:h-[26rem] xl:h-96 lg:h-80 flex flex-col items-start justify-center text-center bg-secondary-pastel hover:border-gray-300"
            whileHover={{ scale: 1.1}}
            transition={{ duration: 0}}
            variants={props.variants}
        >
            <div className="w-full h-1/5 flex items-center justify-center"> 
                <img src={props.featureIcon} className="h-16 transition lg:h-18"/>
            </div>
            <div className="w-full h-1/12 md:h-1/4 flex justify-center items-center"> 
                <h1 className="transition text-jetblack font-lato font-extrabold text-[1.7rem] leading-tight md:text-2xl md:leading-none  xl:leading-none pt-2 pb-6 md:pb-4 xl:pb-2 2xl:px-4 2xl:text-3xl">
                    {props.featureTitle}
                </h1>
            </div>
            <div className="w-full h-1/3"> 
                <p className="transition leading-tight text-gray-500 font-poppins text-xl md:text-[1.2rem] xl:text-[1.18rem] xl:leading-tight xl:pt-4 2xl:pt-4 2xl:text-xl 2xl:leading-tight">
                    {props.featureDescription}
                </p>
            </div>
        </motion.div>
    );
};

export default FeatureCard;