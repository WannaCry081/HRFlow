import axios from "axios";
import { DEPARTMENT_URL } from "/src/lib/constants.js";

const axiosInstance = (token) => {
    return axios.create({
        baseURL: DEPARTMENT_URL,
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
}

export const GetDepartmentsApi = async ( token ) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.get("");
        return response;
    } catch (error) {
        return error.response;
    }
};

export const AddDepartmentApi = async (token, request) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.post("", request);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const UpdateDepartmentPropertyApi = async (token, departmentId, request) =>{
    const instance = axiosInstance(token);

    try {
        const response = await instance.patch(`${departmentId}`, request);
        return response;
    } catch (error) {
        return error.response;
    }
    
    
}

export const DeleteDepartmentApi = async (token, departmentId) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.delete(`${departmentId}`);
        return response;
    } catch (error) {
        return error.response;
    }
}