import axios from "axios";
import { USER_URL } from "/src/lib/constants.js";

const axiosInstance = (token) => axios.create({
    baseURL : USER_URL,
    headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
    }
});

export const GetUserProfileApi = async (token) => {
    const instance = axiosInstance(token);
    try {
        const response = await instance.get();
        return response;
    } catch (error) {
        return error.response;
    }
};


export const UpdateUserProfileApi = async (token, request) => {
    const instance = axiosInstance(token);
    try {
        const response = await instance.put("", request);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const UpdateUserPasswordApi = async (token, request) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.put("/reset-password", request);
        return response;
    } catch (error) {
        return error.response;
    }
};