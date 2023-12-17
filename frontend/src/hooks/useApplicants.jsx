import { useState, useEffect } from "react";
import { GetApplicantsApi } from "/src/services/applicantService.js";

const useApplicantsw = (submit) => {

    const token = sessionStorage.getItem("token");
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const getEmployees = async () => {
            const response = await GetApplicantsApi(token);
            setEmployees(response.data);
        }

        getEmployees();
    }, [submit])

    return employees;

}
export default useApplicantsw;