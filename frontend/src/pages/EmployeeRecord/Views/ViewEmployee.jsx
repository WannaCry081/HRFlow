import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { HiOutlineMail } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { TbDeviceLandlinePhone } from "react-icons/tb";

const ViewEmployee = ({ selectEmployee }) => {

    const birthdate = new Date(selectEmployee.birthdate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    });

    return (
        <section className="h-full w-full flex flex-col justify-center p-4">
            <div className="flex flex-col items-center justify-center">
                <div className="bg-secondary-pastel font-poppins text-4xl font-medium text-secondary-light rounded-2xl p-7">
                    {selectEmployee.firstName[0]}{selectEmployee.lastName[0]}
                </div>
                <h1 className="text-xl 2xl:text-2xl font-lato font-semibold text-jetblack pt-3 text-center">
                    {selectEmployee.firstName} {selectEmployee.middleName} {selectEmployee.lastName}
                </h1>
                <p className="text-sm text-gray-400 font-semibold text-center">
                    ID:
                    <span className="font-light text-gray-400 pt-2 text-base pl-1">
                        {selectEmployee.id}
                    </span>
                </p>
            </div>
            <div className="w-full bg-gray-100 h-0.5 my-4 rounded-full"></div>
            <h1 className="text-left pb-4 uppercase text-gray-500 text-lg">
                Employee Information
            </h1>
            <div className="w-full flex overflow-y-auto">
                <div className=" w-full flex flex-col gap-5 overflow-y-auto py-4">
                    <EmployeeDataField
                        icon={<LiaBirthdayCakeSolid size={30} className="fill-primary-light" />}
                        title="Age"
                        data={selectEmployee.age}
                    />
                    <EmployeeDataField
                        icon={<BsPerson size={30} className="fill-primary-light" />}
                        title="Birthdate"
                        data={birthdate}
                    />
                    <EmployeeDataField
                        icon={<HiOutlineMail size={30} className="stroke-primary-light" />}
                        title="Company Email"
                        data={selectEmployee.companyEmail}
                    />
                    <EmployeeDataField
                        icon={<HiOutlineMail size={30} className="stroke-primary-light" />}
                        title="Personal Email"
                        data={selectEmployee.personalEmail || "N/A"}
                    />
                    <EmployeeDataField
                        icon={<HiOutlineDevicePhoneMobile size={30} className="stroke-primary-light" />}
                        title="Mobile Number"
                        data={selectEmployee.mobileNumber}
                    />
                    <EmployeeDataField
                        icon={<TbDeviceLandlinePhone size={30} className="stroke-primary-light" />}
                        title="Landline Number"
                        data={selectEmployee.landlineNumber || "N/A"}
                    />
                </div>
            </div>
        </section>
    );
};

export default ViewEmployee;

const EmployeeDataField = (prop) => {
    return (
        <div className="flex gap-3">
            <div className="h-12 w-12 bg-primary-pastel rounded-lg flex items-center justify-center">
                {prop.icon}
            </div>
            <div className="">
                <p className="font-poppins text-jetblack pt-2 break-normal font-medium text-base">
                    {prop.data}
                </p>
                <h1 className="text-gray-500 text-sm font-lato font-medium uppercase">
                    {prop.title}
                </h1>
            </div>
        </div>
    );
}