import HRFlowLogo_Dark from "assets/svg/HRFlowLogo_Light.svg";

const Footer = () => {
    return (
        <div className="bg-jetblack w-full flex justify-center transition">
            <div className="w-full max-w-screen-2xl flex items-center justify-between py-5 px-2 xl:px-0">
                <img
                    src={HRFlowLogo_Dark}
                    className="h-12"
                />
                <h1 className="text-lg font-poppins text-gray-100">
                    @DevKings 2023
                </h1>
            </div>
        </div>
    );
};

export default Footer;