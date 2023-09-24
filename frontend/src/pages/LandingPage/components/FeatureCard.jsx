const FeatureCard = (props) => {
    return (
        <div className="border-[0.5px] border-gray-200 shadow-lg rounded-3xl px-4 xl:p-6 transition h-[22rem] md:h-[26rem] xl:h-96 lg:h-80 flex flex-col items-start justify-center text-center bg-secondary-pastel">
            <div className="w-full h-1/5 flex items-center justify-center"> 
                <img src={props.featureIcon} className="h-16 transition lg:h-18"/>
            </div>
            <div className="w-full h-1/12 md:h-1/4 flexjustify-center"> 
                <h1 className="transition text-jetblack font-lato font-extrabold text-[1.7rem] leading-tight md:text-2xl md:leading-none  xl:leading-none pt-2 pb-6 md:pb-0 2xl:text-[1.7rem]">
                    {props.featureTitle}
                </h1>
            </div>
            <div className="w-full h-1/3"> 
                <p className="transition leading-tight text-gray-700 font-poppins text-xl md:text-[1.2rem] xl:text-[1.18rem] xl:leading-tight xl:pt-4 2xl:pt-6 2xl:text-lg 2xl:leading-tight">
                    {props.featureDescription}
                </p>
            </div>
        </div>
    )
}

export default FeatureCard;