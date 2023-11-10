import React, { useState } from "react";
import PositionList from "./Components/PositionList";
import useEmployees from "@Hooks/useEmployees";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useToggle from "@Hooks/useToggle";

const Position = (prop) => {
    const { selectedDepartment } = prop;

    const [selectedPosition, setSelectedPosition] = useState(null);
    const [submit, onSetSubmit] = useToggle();

    const employees = useEmployees(submit);

    const employeesInDepartment = (employees, departmentId) => {
        return employees.filter((employee) => employee.departmentId === departmentId);
    }

    const employeesInSelectedPosition = (employeesInDepartment, selectedPosition) => {
        return selectedPosition
            ? employeesInDepartment.filter((employee) => employee.positionId === selectedPosition.id)
            : [];
    };

    const allEmployees = employeesInDepartment(employees, selectedDepartment.id);
    const positionEmployees = employeesInSelectedPosition(allEmployees, selectedPosition);

    const getPositionName = (positionId) => {
        const position = selectedDepartment.positions.find((pos) => pos.id === positionId);
        return position ? position.title : "";
    };

    const groupedEmployees = (employees) => {
        return employees.reduce((groups, employee) => {
            const firstName = (employee.firstName || "").toUpperCase();
            const firstLetter = firstName[0];

            if (!groups[firstLetter]) {
                groups[firstLetter] = [];
            }
            groups[firstLetter].push(employee);
            return groups;
        }, {});
    };

    const groups = selectedPosition ? groupedEmployees(positionEmployees) : groupedEmployees(allEmployees);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center gap-6">
                <div onClick={prop.onSetViewDepartment}
                    className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-50">
                    <AiOutlineArrowLeft size={32} />
                </div>
                <h1 className="font-lato font-black text-primary-light text-[2.5rem] lg:text-5xl py-4">
                    {selectedDepartment.name}
                </h1>
            </div>
            <div className="flex h-full gap-4"> 
                <div className="bg-white h-full w-2/5 p-4 rounded-xl shadow-lg">
                    <PositionList
                        selectedDepartment={selectedDepartment}
                        submit={submit}
                        onSetSubmit={onSetSubmit}
                        onSetPositionSubmit={prop.onSetPositionSubmit}
                        selectedPosition={selectedPosition}
                        onPositionsSelect={(position) => setSelectedPosition(position)} />
                </div>
                <div className="bg-white h-full w-full p-4 rounded-xl shadow-lg overflow-y-auto">
                    <table className="w-full">
                        <thead className="text-left uppercase self-center sticky top-0 bg-white font-lato">
                            <tr>
                                <th scope="col" className="text-primary-light py-3 px-6 w-[40%] font-black pt-6">
                                    Name
                                </th>
                                <th scope="col" className="text-primary-light py-3 px-6 w-[30%] font-black pt-6">
                                    Company Email
                                </th>
                                <th scope="col" className="text-primary-light py-3 px-6 w-[30%] font-black pt-6">
                                    Position
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(groups).map((initial) => (
                                <React.Fragment key={initial}>
                                    <tr className="bg-gray-100 border-none">
                                        <td colSpan="3" className="px-6 py-1 my-4 text-sm font-semibold">
                                            <p>{initial}</p>
                                        </td>
                                    </tr>
                                    {groups[initial].map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-4 py-2 h-full font-poppins text-gray-600 justify-start  items-center text-ellipsis flex">
                                                <div className="font-medium h-14 w-14 flex justify-center items-center bg-secondary-pastel mr-6 rounded-xl shadow-md">
                                                    <div className="text-secondary-light text-xl font-poppins">
                                                        {employee.firstName[0]}{employee.lastName[0]}
                                                    </div>
                                                </div>
                                                {`${employee.firstName} ${employee.lastName}`}
                                            </td>
                                            <td className="px-6 py-3 h-full font-poppins text-gray-600 text-start items-center text-ellipsis">
                                                {employee.companyEmail}
                                            </td>
                                            <td className="px-6 py-3 h-full font-poppins text-gray-600 text-start items-center text-ellipsis">
                                                {getPositionName(employee.positionId)}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default Position;    