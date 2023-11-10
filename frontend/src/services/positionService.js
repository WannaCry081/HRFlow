import axios from "axios";
import { DEPARTMENT_URL } from "@Utils/constants";

const axiosInstance = (token) => {
    return axios.create({
        baseURL: DEPARTMENT_URL,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
}


export const AddPositionApi = async (token, departmentId, request) => {
    const instance = axiosInstance(token);
    
    try {
        const response = await instance.post(`${departmentId}/position`, request);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const GetPositionsApi = async (token, departmentId) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.get(`${departmentId}/position`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const DeletePositionApi = async (token, departmentId, positionId) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.delete(`${departmentId}/position/${positionId}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const UpdatePositionPropertyApi = async (token, departmentId, positionId, request ) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.patch(`${departmentId}/position/${positionId}`, request);
        return response;
    } catch (error) {
        return error.response;
    }
}