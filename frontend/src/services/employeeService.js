import axios from "axios";
import { EMPLOYEE_URL } from "/src/lib/constants.js";

const axiosInstance = (token) => {
    return axios.create({
        baseURL: EMPLOYEE_URL,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
}

export const GetEmployeesApi = async ( token ) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.get("");
        return response;
    } catch (error) {
        return error.response;
    }
};

export const AddEmployeeApi = async ( token, request ) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.post("", request);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const UpdateEmployeesProperty = async (token, employeeId, request) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.patch(`${employeeId}`, request);
        return response;
    } catch (error) {
        return error.response;
    }
}