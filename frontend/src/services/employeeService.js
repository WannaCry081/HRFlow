import axios from "axios";
import { EMPLOYEE_URL } from "../utils/constants";

const axiosInstance = (token) => {
    return axios.create({
        baseURL: EMPLOYEE_URL,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
}

export const GetEmployeeApi = async ( token ) => {
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