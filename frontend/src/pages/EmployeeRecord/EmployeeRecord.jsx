import { LuSearch } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { GetEmployeeApi } from "@Services/employeeService";
import React, { useEffect, useState } from "react";
import useToggle from "@Hooks/useToggle";
import AddEmployeeForm from "./Views/AddEmployee";
import ViewEmployee from "./Views/ViewEmployee";

const EmployeeRecord = () => {
    const token = sessionStorage.getItem("token");

    const [employees, setEmployees] = useState([]);
    const [addEmployee, onSetAddEmployee] = useToggle();
    const [submit, onSetSubmit] = useToggle();

    useEffect(() => {
        const getEmployees = async () => {
            const response = await GetEmployeeApi(token);
            setEmployees(response.data);
        }
        getEmployees();
    }, [submit])

    const filteredEmployees = employees.filter((employee) => {
        const firstName = employee.firstName || "";
        const lastName = employee.lastName;

        return (
            firstName.toLowerCase() ||
            lastName.toLowerCase()
        );
    })
    const groupedEmployees = filteredEmployees.reduce((groups, employee) => {
        const firstLetter = employee.firstName[0].toUpperCase();
        if (!groups[firstLetter]) {
            groups[firstLetter] = [];
        }
        groups[firstLetter].push(employee);
        return groups;
    }, {});

    const sortedGroupLetters = Object.keys(groupedEmployees).sort();

    return (
        <section className="w-full h-full bg-primary-palePastel rounded-tl-3xl rounded-tr-3xl 2xl:rounded-tl-[2.5rem] 2xl:rounded-tr-[2.5rem] px-4 2xl:px-10 pt-12">
            {addEmployee && <AddEmployeeForm onSetSubmit={onSetSubmit} submit={submit} onSetAddEmployee={onSetAddEmployee} />}
            <div className="h-full w-full flex flex-col">
                <h1 className="font-lato font-extrabold text-jetblack text-3xl lg:text-4xl">
                    Employee Records
                </h1>
                <div className="flex h-full overflow-y-hidden pb-14">
                    <div className="w-full h-full 2xl:w-[70%] py-12">
                        <div className="flex gap-2">
                            <div className="relative flex items-center w-full">
                                <LuSearch size={24} className="absolute ml-3 stroke-gray-400"/>
                                <input
                                    placeholder="Search employee"
                                    className="w-full lg:w-96 rounded-lg p-2.5 pl-10 shadow-md focus:border md:text-lg focus:outline-primary-light"
                                    />
                            </div>
                            <div className="w-1/5 lg:w-56 gap-2 bg-primary-light flex items-center rounded-lg justify-center hover:bg-primary-dark">
                                <IoMdAdd size={24} className="fill-white" />
                                <p className="hidden lg:block text-white font-poppins font-semibold">Add Employee</p>
                            </div>
                        </div>
                        <div className="mt-6 bg-white shadow-lg  h-full overflow-y-auto rounded-xl px-1.5">
                            <table className="w-full">
                                <thead className="text-left uppercase self-center sticky top-0 bg-white font-lato mt-8">
                                    <tr className="">
                                        <th scope="col" className="text-primary-light py-3 px-6 w-[50%] font-black pt-6">
                                            Name
                                        </th> 
                                        <th scope="col" className="text-primary-light py-3 pt-6  font-black hidden md:table-cell w-[25%]">
                                            Company Email
                                        </th> 
                                        <th scope="col" className="text-primary-light py-3 pt-6 px-6 font-black hidden lg:table-cell xl:pl-6 w-[25%]">
                                            Mobile Number
                                        </th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedGroupLetters.map((groupLetter) => (
                                        <React.Fragment key={groupLetter}>
                                            <tr className="bg-gray-100 border-none">
                                                <td colSpan="3" className="px-6 py-1 my-8 text-sm font-semibold">
                                                    {groupLetter}
                                                </td>
                                            </tr>
                                            {groupedEmployees[groupLetter].map((employee) => (
                                                <tr
                                                    key={employees.id}
                                                    className="hover:bg-primary-pastel cursor-pointer h-full"
                                                >
                                                    <td className="px-6 py-3 h-full font-poppins text-gray-600 flex items-center text-ellipsis">
                                                        <div className="font-medium h-14 w-14 flex justify-center items-center bg-secondary-pastel mr-6 rounded-xl shadow-md">
                                                            <div className="text-secondary-light text-xl font-poppins">
                                                                {employee.firstName[0]}{employee.lastName[0]}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col text-lg text-gray-800 font-poppins">
                                                            {employee.firstName}    {employee.lastName}
                                                            <p className="italic text-xs text-gray-400">
                                                                { employee.id }
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="hidden md:table-cell py-2 font-poppins text-gray-500 w-[25%] truncate">
                                                        {employee.companyEmail}
                                                    </td>
                                                    <td className="hidden font-poppins lg:table-cell py-2 lg:pl-6 text-gray-500 w-[25%] truncate">
                                                        {employee.mobileNumber}
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                                
                            </table>
                        </div>
                    </div>
                    <div className=" hidden 2xl:block">
                        <ViewEmployee />
                    </div>
                </div>
            </div>

        </ section>
    );
};

export default EmployeeRecord;

