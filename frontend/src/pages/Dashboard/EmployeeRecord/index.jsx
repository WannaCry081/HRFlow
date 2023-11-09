import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuSearch } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { GetEmployeeApi } from "@Services/employeeService";
import useToggle from "@Hooks/useToggle";
import AddEmployeeForm from "./Views/AddEmployee";
import ViewEmployee from "./Views/ViewEmployee";
import Arrow from "@Assets/svg/Arrow.svg";

const EmployeeRecord = () => {
    const token = sessionStorage.getItem("token");

    const [employees, setEmployees] = useState([]);
    const [selectEmployee, setSelectEmployee] = useState(null);
    const [addEmployee, onSetAddEmployee] = useToggle();
    const [showCard, onSetShowCard] = useToggle();
    const [submit, onSetSubmit] = useToggle();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getEmployees = async () => {
            const response = await GetEmployeeApi(token);
            setEmployees(response.data);
        }
        getEmployees();
    }, [submit])

    const query = searchQuery ? searchQuery.toLowerCase() : "";

    const groupedEmployees = employees.reduce((groups, employee) => {
        const firstName = (employee.firstName || "").toLowerCase();
        const lastName = employee.lastName.toLowerCase();
        const firstLetter = firstName[0].toUpperCase();

        if (firstName.includes(query) || lastName.includes(query)) {
            if (!groups[firstLetter]) {
                groups[firstLetter] = [];
            }
            groups[firstLetter].push(employee);
        }

        return groups;
    }, {});

    const sortedGroupLetters = Object.keys(groupedEmployees).sort();

    return (
        <section className="w-full h-full">
            <div className="h-full w-full flex gap-3">
                { addEmployee
                        ? <AddEmployeeForm onSetSubmit={onSetSubmit} submit={submit} onSetAddEmployee={onSetAddEmployee} />
                        : <>
                            {/* Left Side: Search and add employee && Display Employee List*/}
                            <div className={`flex flex-col overflow-y-hidden bg-primary-palePastel px-4 2xl:px-10 rounded-tl-3xl rounded-tr-3xl 2xl:rounded-tl-[2.5rem] 2xl:rounded-tr-[2.5rem] py-10  ${addEmployee ? "w-full" : "2xl:w-[70%]"}`}>
                                <h1 className="font-lato font-extrabold text-jetblack text-3xl lg:text-4xl py-2">
                                    Employee Records
                                </h1>
                                <div className="w-full h-full pb-28">
                                    <div className="flex gap-2 py-3">
                                        {/* Search Employee Input */}
                                        <div className="relative flex items-center w-full">
                                            <LuSearch size={24} className="absolute ml-3 stroke-gray-400" />
                                            <input
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search employee"
                                                className="w-full lg:w-96 rounded-lg p-2.5 pl-10 shadow-md focus:border focus:outline-primary-light"
                                            />
                                        </div>
                                        {/* Add Employee Button */}
                                        <div
                                            onClick={onSetAddEmployee}
                                            className="w-1/5 lg:w-56 gap-2 bg-primary-light flex items-center rounded-lg justify-center hover:bg-primary-dark">
                                            <IoMdAdd size={24} className="fill-white" />
                                            <p className="hidden lg:block text-white font-poppins font-semibold cursor-pointer">
                                                Add Employee
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow-lg h-[720px] min-h-[720px] max-h-[720px] overflow-y-auto rounded-xl px-1.5">
                                        {/* Employee Records List */}
                                        <table className="w-full">
                                            <thead className="text-left uppercase self-center sticky top-0 bg-white font-lato">
                                                <tr >
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
                                            <tbody className="">
                                                {sortedGroupLetters.map((groupLetter) => (
                                                    <React.Fragment key={groupLetter}>
                                                        <tr className="bg-gray-100 border-none">
                                                            <td colSpan="3" className="px-6 py-1 my-8 text-sm font-semibold">
                                                                {groupLetter}
                                                            </td>
                                                        </tr>
                                                        {groupedEmployees[groupLetter].map((employee) => (
                                                            <tr
                                                                key={employee.id}
                                                                className={`hover:bg-primary-pastel cursor-pointer h-full ${selectEmployee && employee.id === selectEmployee.id ? "bg-primary-pastel" : ""}`}
                                                                onClick={() => {
                                                                    setSelectEmployee(employee);
                                                                    onSetShowCard();
                                                                }}
                                                            >
                                                                <td className="px-6 py-3 h-full font-poppins text-gray-600 flex items-center text-ellipsis">
                                                                    <div className="font-medium h-14 w-14 flex justify-center items-center bg-secondary-pastel mr-6 rounded-xl shadow-md">
                                                                        <div className="text-secondary-light text-xl font-poppins">
                                                                            {employee.firstName[0]}{employee.lastName[0]}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col text-gray-800 font-poppins">
                                                                        {employee.firstName} {employee.lastName}
                                                                        <p className="italic text-xs text-gray-400">
                                                                            {employee.id}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className="hidden md:table-cell py-2 font-poppins text-gray-500 w-[25%] truncate">
                                                                    {employee.companyEmail}
                                                                </td>
                                                                <td className="hidden font-poppins lg:table-cell py-2 lg:pl-6 text-gray-500 w-[25%] truncate">
                                                                    {employee.mobileNumber || "N/A"} 
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
                        </>
                }
               
                <div className={`bg-gray-50 rounded-2xl p-2 overflow-y-auto ${addEmployee ? "w-[0%] hidden" : "hidden 2xl:block w-[30%]"}`}>
                    {/* Right Side: Display selected employee */}
                    {selectEmployee == null
                        ? <div className="h-full flex items-center justify-center flex-col">
                            <img src={Arrow} alt="Arrow" className="h-20" />
                            <h1 className="pt-4 text-2xl text-center text-rustic-light font-lato font-black">
                                No selected employee yet.
                            </h1>
                            <p className="text-lg font-poppins text-gray-500 text-center">
                                Click an employee to view information.
                            </p>

                        </div>
                        : <ViewEmployee selectEmployee={selectEmployee} />}
                </div>

                {/* Toggle card for xl screen sizes or smaller */}
                {showCard && <div className="block 2xl:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{
                            x: "0%",
                            transition: { duration: 0.4 },
                        }}
                        className="w-full md:w-1/2 bg-white h-full absolute right-0 p-4" >
                        <div onClick={onSetShowCard}>
                            <AiOutlineClose size={34} />
                        </div>
                        {selectEmployee == null
                            ? <> </>
                            : <ViewEmployee selectEmployee={selectEmployee} />
                        }
                    </motion.div>
                </div>}
            </div>  
        </ section>
    );
};

export default EmployeeRecord;

