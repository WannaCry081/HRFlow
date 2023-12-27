import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GoNumber } from "react-icons/go";
import {
    FiMail,
    FiPhone,
    FiTablet
} from "react-icons/fi";
import { GrStatusUnknown } from "react-icons/gr";

const ViewApplicant = (prop) => {
    
    const birthDate = new Date(prop.selectApplicant.birthDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    });
    
    return (
        <section className="h-full w-full flex flex-col px-4">
            <div className="flex flex-col items-center justify-center">
                <div className="bg-blush-pastel font-poppins text-4xl font-medium text-blush rounded-2xl p-7">
                    {prop.selectApplicant.firstName[0]}{prop.selectApplicant.lastName[0]}
                </div>
                <h1 className="text-2xl font-lato font-semibold text-jetblack pt-3 text-center">
                    {prop.selectApplicant.firstName} {prop.selectApplicant.middleName} {prop.selectApplicant.lastName} {prop.selectApplicant.suffix}
                </h1>
            </div>
            <div className="w-full bg-gray-200 h-[0.1rem] my-4 rounded-full"></div>
            <h1 className="text-left mt-2 uppercase text-gray-500 text-lg font-medium">
                Employee Information
            </h1>
            <div className="w-full flex overflow-y-auto">
                <div className=" w-full flex flex-col gap-5 overflow-y-auto py-4">
                    <EmployeeDataField
                        icon={<GrStatusUnknown size={30} className="stroke-lilac" />}
                        title="Status"
                        data={prop.selectApplicant.status}
                    />
                    <EmployeeDataField
                        icon={<LiaBirthdayCakeSolid size={30} className="fill-lilac" />}
                        title="Age"
                        data={prop.selectApplicant.age}
                    />
                    <EmployeeDataField
                        icon={<GoNumber size={30} className="fill-lilac" />}
                        title="Birthdate"
                        data={birthDate}
                    />
                    <EmployeeDataField
                        icon={<FiMail size={30} className="stroke-lilac" />}
                        title="Email Address"
                        data={prop.selectApplicant.email || "N/A"}
                    />
                    <EmployeeDataField
                        icon={<FiTablet size={30} className="stroke-lilac" />}
                        title="Mobile Number"
                        data={prop.selectApplicant.mobileNumber || "N/A"}
                    />
                    <EmployeeDataField
                        icon={<FiPhone size={30} className="stroke-lilac" />}
                        title="Landline Number"
                        data={prop.selectApplicant.landlineNumber || "N/A"}
                    />
                </div>
            </div>
        </section>
    );
};

export default ViewApplicant;

const EmployeeDataField = (prop) => {
    return (
        <div className="flex gap-3">
            <div className="h-12 w-12 bg-lilac-pastel rounded-lg flex items-center justify-center">
                {prop.icon}
            </div>
            <div className="">
                <p className="font-poppins text-jetblack pt-2 break-normal font-medium text-base">
                    {prop.data}
                </p>
                <h1 className="text-gray-400 text-sm font-lato font-medium uppercase">
                    {prop.title}
                </h1>
            </div>
        </div>
    );
}