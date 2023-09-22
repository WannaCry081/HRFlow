import HRFlowLogo_Dark from "assets/svg/HRFlowLogo_Light.svg";

const Footer = () => {
    return (
        <div className="bg-jetblack w-full flex justify-center">
            <div className="w-full max-w-screen-xl flex items-center justify-between py-6 px-2 xl:px-0">
                <img
                    src={HRFlowLogo_Dark}
                    className="h-8"
                />
                <h1 className="text-xs font-poppins text-gray-100">
                    @DevKings 2023
                </h1>
            </div>
        </div>
    )
}

export default Footer;