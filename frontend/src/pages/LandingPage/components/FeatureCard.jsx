const FeatureCard = (props) => {
    return (
        <div>
            <div className="border-[0.5px] border-gray-200 shadow-md rounded-3xl p-4 xl:p-6 h-72 bg-secondary-pastel flex flex-col items-start justify-center">
                <img src={props.featureIcon} className="h-12" />
                <h1 className="leading-tight text-jetblack font-lato font-bold text-xl pt-6 pb-3 xl:text-xl">
                    {props.featureTitle}
                </h1>
                <p className="leading-tight text-gray-700 font-poppins text-sm xl:text-xs">
                    {props.featureDescription}
                </p>
            </div>
        </div>
    )
}

export default FeatureCard;