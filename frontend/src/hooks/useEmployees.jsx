import { useState, useEffect } from "react";
import { GetEmployeesApi } from "/src/services/employeeService";

const useEmployees = (submit) => {

    const token = sessionStorage.getItem("token");
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const getEmployees = async () => {
            const response = await GetEmployeesApi(token);
            setEmployees(response.data);
        }

        getEmployees();
    }, [submit])

    return employees;

}
export default useEmployees;