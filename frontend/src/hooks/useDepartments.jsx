import { useEffect, useState } from "react";
import { GetDepartmentsApi } from "/src/services/departmentService";

const useDepartments = (createDepartment, createPosition) => {

    const token = sessionStorage.getItem("token");
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const getDepartments = async () => {
            const response = await GetDepartmentsApi(token);
            setDepartments(response.data);
        };

        getDepartments();
    }, [createDepartment, createPosition]);

    return departments;
};

export default useDepartments;