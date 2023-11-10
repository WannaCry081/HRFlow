import { useEffect, useState } from "react";
import { GetDepartmentsApi } from "../services/departmentService";

const useDepartments = ( submit, positionSubmit ) => {

    const token = sessionStorage.getItem("token");
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const getDepartments = async () => {
            const response = await GetDepartmentsApi(token);
            setDepartments(response.data);
        };

        getDepartments();
    }, [submit, positionSubmit]);

    return departments;
};

export default useDepartments;