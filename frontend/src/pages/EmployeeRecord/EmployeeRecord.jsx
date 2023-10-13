import { LuSearch } from "react-icons/lu";
import { MdAddCircle } from "react-icons/md";
import { GetEmployeeApi } from "@Services/employeeService";
import React, { useEffect, useState } from "react";
import useToggle from "@Hooks/useToggle";
import AddEmployeeForm from "./Forms/AddEmployee";

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
    }, [ submit ])

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


    return (
        <section className="bg-primary-base w-full h-full">
            
            {addEmployee && <AddEmployeeForm onSetSubmit={onSetSubmit} submit={submit} onSetAddEmployee={onSetAddEmployee}/>}

            <div className="w-full flex h-full pt-28">
                <div className="w-[65%] h-full bg-primary-palePastel rounded-tl-[2rem] rounded-tr-[2rem] pt-12 px-8 flex flex-col">
                    <div className="flex gap-4 justify-between">
                        <div className="relative items-center w-96">
                            <span className="absolute pl-3 inset-y-0 flex items-center">
                                <LuSearch size={24} className="stroke-gray-400" />
                            </span>
                            <input
                                placeholder="Search employee"
                                className="text-lg rounded-lg border-primary-pastel p-2 pl-12 bg-white shadow-sm w-full border-collapse focus:border focus:outline-primary-light"
                            />
                        </div>
                        <div 
                            onClick={onSetAddEmployee}
                            className="bg-primary-light w-48 relative flex justify-center items-center rounded-lg font-semibold text-white font-lato text-lg">
                            <MdAddCircle size={26} className="mr-2 fill-white" />
                            Add Employee
                        </div>

                    </div>
                    <div className="flex-grow max-h-[780px] bg-white shadow-lg rounded-tl-2xl rounded-tr-2xl px-4 pt-4 mt-8">
                        <div className="relative overflow-y-hidden flex h-full">
                            <div className=" overflow-y-auto w-full h-full">
                                {
                                    employees.length === 0
                                        ?
                                        <>
                                            <div className="flex flex-col justify-center items-center h-full p-12">
                                                <p className='font-medium text-center'>No employees found.</p>
                                            </div>
                                        </>

                                        : <table className="w-full text-lg text-left text-gray-700 dark:text-gray-400 relative">
                                            <thead className="uppercase dark:text-gray-500 self-center sticky top-0 w-full bg-white ">
                                                <tr className="text-sm ">
                                                    <th scope="col" className="text-primary-light px-6 py-3 w-2/5 hidden md:table-cell">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-primary-light hidden md:table-cell" style={{ width: '25%' }}>
                                                        Company Email
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-500 h-full">
                                                {Object.keys(groupedEmployees).map((groupLetter) => (
                                                    <React.Fragment key={groupLetter}>
                                                        <tr className="bg-primary-palePastel border-none">
                                                            <td colSpan="3" className="px-6 py-1 my-8 text-sm font-semibold">
                                                                {groupLetter}
                                                            </td>
                                                        </tr>
                                                        {groupedEmployees[groupLetter].map((employee) => (
                                                            <tr
                                                                key={employees.id}
                                                                className={`hover:bg-paleBlue cursor-pointer h-full`}
                                                            >
                                                                <td className="px-6 py-2 h-full font-poppins text-gray-600 flex items-center text-ellipsis">
                                                                    <div className="flex items-center justify-center font-medium h-14 w-14 bg-secondary-pastel text-brown mr-8 2xl:mr-6 rounded-xl shadow-md">
                                                                        <div className="h-full w-full flex items-center justify-center text-secondary-light font-poppins">
                                                                            {employee.firstName[0]}{employee.lastName[0]}
                                                                        </div>
                                                                    </div>
                                                                    {`${employee.firstName} ${employee.lastName}`}
                                                                </td>
                                                                <td className="hidden md:table-cell px-6 py-2 font-poppins text-gray-600" style={{ width: '25%' }}>
                                                                    {employee.companyEmail}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                </div>
            </div>
        </ section>
    );
};

export default EmployeeRecord;