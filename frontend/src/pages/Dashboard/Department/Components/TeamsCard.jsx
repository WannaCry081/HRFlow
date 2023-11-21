import {
    PiToolboxBold,
    PiUsersThreeBold,
    PiArrowRightBold,
    PiTrashBold
} from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";

const TeamsCard = (prop) => {
    return (
        <div onClick={prop.onSelectDepartment}
            className={`w-full h-54 rounded-2xl shadow-lg p-6 flex flex-col items-start cursor-pointer  ${prop.selectedDepartment && prop.selectedDepartment.id === prop.department.id ? "bg-zinc-50" : "bg-white"}`}>
            <div className="w-full justify-end flex gap-1">
                <div onClick={prop.onSetOpenModal}
                    className="h-10 w-10 group cursor-pointer bg-gray-50 hover:bg-pink-100 rounded-full flex items-center justify-center">
                    <FiEdit3 size={20} className="stroke-gray-300 group-hover:stroke-pink-500" />
                </div>
                <div onClick={prop.onSetConfirmModal}
                    className="h-10 w-10 group cursor-pointer bg-gray-50 hover:bg-red-100 rounded-full flex items-center justify-center">
                    <PiTrashBold size={22} className="fill-gray-300 group-hover:fill-red-500" />
                </div>
            </div>

            <h1 className="pb-2 font-poppins text-[1.40rem] text-gray-600 font-medium">
                {prop.name}
            </h1>
            <div className="flex items-end w-full line-above">
                <div className="flex flex-col gap-1 w-full justify-between pt-6">
                    <div className="flex gap-2 text-lg">
                        <PiUsersThreeBold size={32} className="fill-primary-dark" />
                        <p className="text-gray-500 font-lato">
                            {prop.employeeCount === 0 ? "No members" : prop.employeeCount === 1 ? "1 member" : `${prop.positionCount} members`}
                        </p>
                    </div>
                    <div className="flex gap-2 text-lg">
                        <PiToolboxBold size={32} className="fill-primary-dark" />
                        <p className="text-gray-500 font-lato">
                            {prop.positionCount === 0 ? "No positions" : prop.positionCount === 1 ? "1 position" : `${prop.positionCount} positions`}
                        </p>
                    </div>
                </div>
                <div onClick={prop.onSelect}
                    className="bg-primary-light h-10 w-12 items-center justify-center flex rounded-full cursor-pointer hover:bg-primary-dark">
                    <PiArrowRightBold size={26} className="fill-white" />
                </div>
            </div>
        </div>
    )
}

export default TeamsCard;