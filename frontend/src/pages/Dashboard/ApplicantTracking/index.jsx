import React, { useState } from "react";
import { useApplicants } from "/src/hooks";
import { motion } from "framer-motion";
import { LuSearch } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import useToggle from "/src/hooks/useToggle";
import ViewApplicant from "./Views/ViewApplicant";
import Arrow from "/src/assets/svg/Arrow.svg";
import AddApplicantForm from "./Views/AddApplicant";

const ApplicantTracking = () => {

    const [submit, onSetSubmit] = useToggle();

    const [selectApplicant, onSetSelectApplicant] = useState(null);
    const [addApplicant, onSetAddApplicant] = useToggle();
    const [showCard, onSetShowCard] = useToggle();
    const [searchQuery, setSearchQuery] = useState("");

    const applicants = useApplicants(addApplicant);

    const query = searchQuery ? searchQuery.toLowerCase() : "";

    const groupedApplicants = applicants.reduce((groups, applicant) => {
        const firstName = (applicant.firstName || "").toLowerCase();
        const lastName = applicant.lastName.toLowerCase();
        const firstLetter = firstName[0].toUpperCase();

        if (firstName.includes(query) || lastName.includes(query)) {
            if (!groups[firstLetter]) {
                groups[firstLetter] = [];
            }
            groups[firstLetter].push(applicant);
        }

        return groups;
    }, {});

    const sortedGroupLetters = Object.keys(groupedApplicants).sort();

    return (
        <div className="flex h-full">
            { addApplicant
                ? <AddApplicantForm onSetSubmit={onSetSubmit} submit={submit} onSetAddApplicant={onSetAddApplicant} />
                : <>
                    <section className="w-[75%] bg-lilac-pale rounded-t-[2.5rem] p-8 flex flex-col">
                        <h1 className="text-4xl font-bold font-lato text-lilac mt-4">Applicant Tracking</h1>
                        <div className="flex justify-between w-full items-center my-4">
                            <div className="relative flex items-center w-full">
                                <LuSearch size={24} className="absolute ml-3 stroke-gray-400" />
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search Applicant"
                                    className="w-full lg:w-96 rounded-lg p-2.5 pl-10 shadow-md focus:border focus:outline-primary-light"
                                />
                            </div>
                            <div
                                onClick={onSetAddApplicant}
                                className="w-1/5 lg:w-56 gap-2 bg-lilac flex items-center rounded-lg justify-center hover:bg-lilac-dark h-full cursor-pointer">
                                <IoMdAdd size={24} className="fill-white" />
                                <p className="hidden lg:block text-white font-poppins font-semibold">
                                    Add Applicant
                                </p>
                            </div>
                        </div>
                        <div className="bg-white flex-grow rounded-xl shadow-lg p-1.5">
                            <table className="w-full">
                                <thead className="text-left uppercase self-center sticky top-0 bg-white font-lato">
                                    <tr>
                                        <th scope="col" className="text-lilac py-3 px-6 w-[50%] pt-6">
                                            Applicant
                                        </th>
                                        <th scope="col" className="text-lilac py-3 pt-6 hidden md:table-cell w-[25%]">
                                            Email Address
                                        </th>
                                        <th scope="col" className="text-lilac py-3 pt-6 px-6 hidden lg:table-cell xl:pl-6 w-[25%]">
                                            Status
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
                                            {groupedApplicants[groupLetter].map((applicant) => (
                                                <tr
                                                    key={applicant.id}
                                                    className={`hover:bg-lilac-pastel cursor-pointer h-full ${selectApplicant && applicant.id === selectApplicant.id ? "bg-lilac-pastel" : ""}`}
                                                    onClick={() => {
                                                        onSetSelectApplicant(applicant);
                                                        onSetShowCard();
                                                    }}
                                                >
                                                    <td className="px-6 py-3 h-full font-poppins text-gray-600 flex items-center text-ellipsis">
                                                        <div className="font-medium h-14 w-14 flex justify-center items-center bg-blush-pastel mr-6 rounded-xl shadow-md">
                                                            <div className="text-blush text-xl font-poppins">
                                                                {applicant.firstName[0]}{applicant.lastName[0]}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col text-gray-800 font-poppins">
                                                            {applicant.firstName} {applicant.lastName}
                                                        </div>
                                                    </td>
                                                    <td className="hidden md:table-cell py-2 font-poppins text-gray-500 w-[25%] truncate">
                                                        {applicant.email}
                                                    </td>
                                                    <td className="hidden font-poppins lg:table-cell py-2 lg:pl-6 text-gray-500 w-[25%] truncate">
                                                        {applicant.status || "N/A"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section className="w-[25%] p-2">
                        {selectApplicant == null
                            ? <div className="h-full flex items-center justify-center flex-col">
                                <img src={Arrow} alt="Arrow" className="h-20" />
                                <h1 className="pt-4 text-2xl text-center text-rustic font-lato font-semibold">
                                    No selected applicant yet.
                                </h1>
                                <p className="text-lg font-poppins text-gray-500 text-center">
                                    Click an applicant to view information.
                                </p>

                            </div>
                            : <ViewApplicant 
                                submit={submit}
                                selectApplicant={selectApplicant} />}
                    </section>
                </>
            }
        </div>
    );
};

export default ApplicantTracking;

