
import { useState, useEffect } from "react";
import { GetRecordApi } from "/src/services/recordService.js";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Salary = () => {
    const [records, setRecords] = useState([]);
    const token = sessionStorage.getItem("token");

    const baseSalary = 62.50;
    
    const fetchRecords = async () => {
        const response = await GetRecordApi(token);
        if (response.status === 200) {
            const sortedRecords = response.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
            setRecords(sortedRecords);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    function calculateHoursWorked(record) {
        const clockInTime = new Date(record.clockIn);
        const clockOutTime = new Date(record.clockOut);
        const timeDiffMs = clockOutTime - clockInTime;
        const hoursWorked = timeDiffMs / (1000 * 60 * 60); 
        return hoursWorked;
    }

    const totalHoursWorked = records.reduce((total, record) => {
        return total + calculateHoursWorked(record);
    }, 0);

    const totalEarnings = baseSalary * totalHoursWorked;

    return (    
        <section className="p-16    ">
            <h1 className="text-5xl font-bold font-lato text-lilac">Basic Salary Computation</h1>
            <div className="mt-12 gap-3 flex flex-col">
                <CalculationItem 
                    title="Hourly Pay Rate"
                    value= "Php 62.50"
                />
                <CalculationItem 
                    title="Number of Hours Worked"
                    value={`${totalHoursWorked.toFixed(2)} hours`}
                />
            </div>
            <div className="w-full h-1 bg-gray-200 my-4"/>
            <h1 className="text-3xl flex justify-end mt-8">Salary :
                <span className="ml-5 text-3xl text-lilac font-bold">Php {totalEarnings.toFixed(2)}</span>
            </h1>

        </section>
    );
}

export default Salary;


export const CalculationItem = (prop) => {
    return (
        <div className="flex justify-between">
            <h1 className="text-2xl font-lato text-blush font-semibold">{prop.title}</h1>
            <h1 className="text-2xl font-lato font-semibold">{prop.value}</h1>
        </div>
    );
}