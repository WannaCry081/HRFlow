import { useDepartments, usePositions} from "/src/hooks";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GoNumber } from "react-icons/go";
import {
    FiMail,
    FiPhone,
    FiTablet
} from "react-icons/fi";


const ViewEmployee = (prop) => {

    const departments = useDepartments();
    const positions = usePositions(prop.addEmployee,  prop.selectEmployee.departmentId);
 
    const department =  departments.find((dept) => dept.id === prop.selectEmployee.departmentId);
    const position = positions.find((pos) => pos.id === prop.selectEmployee.positionId) ;
    
    const birthdate = new Date(prop.selectEmployee.birthdate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    });
    
    return (
        <section className="h-full w-full flex flex-col px-4">
            <div className="flex flex-col items-center justify-center">
                <div className="bg-blush-pastel font-poppins text-4xl font-medium text-blush rounded-2xl p-7">
                    {prop.selectEmployee.firstName[0]}{prop.selectEmployee.lastName[0]}
                </div>
                <h1 className="text-2xl font-lato font-semibold text-jetblack pt-3 text-center">
                    {prop.selectEmployee.firstName} {prop.selectEmployee.middleName} {prop.selectEmployee.lastName} {prop.selectEmployee.suffix}
                </h1>
                <h1 className="pt-2 text-gray-400 font-poppins"> 
                    {(department && position) ? `${department.name} | ${position.title}` : "N / A"}
                    
                </h1>
            </div>
            <div className="w-full bg-gray-200 h-[0.1rem] my-2 rounded-full"></div>
            <h1 className="text-left mt-1 uppercase text-gray-500 text-lg font-medium">
                Employee Information
            </h1>
            <div className="w-full flex overflow-y-auto">
                <div className=" w-full flex flex-col gap-5 overflow-y-auto py-4">
                    <EmployeeDataField
                        icon={<LiaBirthdayCakeSolid size={30} className="fill-lilac" />}
                        title="Age"
                        data={prop.selectEmployee.age}
                    />
                    <EmployeeDataField
                        icon={<LiaBirthdayCakeSolid size={30} className="fill-lilac" />}
                        title="Sex"
                        data={prop.selectEmployee.sex == "F" ? "Female" : "Male"} 
                    />
                    <EmployeeDataField
                        icon={<GoNumber size={30} className="fill-lilac" />}
                        title="Birthdate"
                        data={birthdate}
                    />
                    <EmployeeDataField
                        icon={<FiMail size={30} className="stroke-lilac" />}
                        title="Company Email"
                        data={prop.selectEmployee.companyEmail}
                    />
                    <EmployeeDataField
                        icon={<FiMail size={30} className="stroke-lilac" />}
                        title="Personal Email"
                        data={prop.selectEmployee.personalEmail || "N/A"}
                    />
                    <EmployeeDataField
                        icon={<FiTablet size={30} className="stroke-lilac" />}
                        title="Mobile Number"
                        data={prop.selectEmployee.mobileNumber || "N/A"}
                    />
                    <EmployeeDataField
                        icon={<FiPhone size={30} className="stroke-lilac" />}
                        title="Landline Number"
                        data={prop.selectEmployee.landlineNumber || "N/A"}
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