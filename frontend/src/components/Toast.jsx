import { BsFillCheckCircleFill } from "react-icons/bs";

const Toast = (prop) => {
    return (
        <div className="bg-green-100 border max-w-[30rem] min-w-[20rem] px-4 rounded-lg border-green-400 fixed bottom-5 right-5 z-10 flex items-center py-3 gap-3">
            <BsFillCheckCircleFill size={24} className="fill-green-700"/>
            <div className="flex self-start flex-grow text-poppins text-lg text-green-700 font-medium">
                { prop.message }
            </div>
        </div>
    );
};

export default Toast;
