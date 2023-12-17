import axios from "axios";
import { APPLICANT_URL } from "/src/lib/constants.js";

const axiosInstance = (token) => axios.create({
    baseURL : APPLICANT_URL,
    headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
    }
});

export const GetApplicantsApi = async (token) => {
    const instance = axiosInstance(token);
    try {
        const response = await instance.get();
        return response;
    } catch (error) {
        return error.response;
    }
};
export const GetApplicantApi = async (token, id) => {
    const instance = axiosInstance(token);
    try {
        const response = await instance.get(`/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};


export const CreateApplicantApi = async (token, request) => {
    const instance = axiosInstance(token);
    console.log(request);
    try {
        const response = await instance.post("", request);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const UpdateApplicantApi = async (token, id, request) => {
    const instance = axiosInstance(token);
    try {
        const response = await instance.put(`/${id}`, request);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const DeleteApplicantApi = async (token, id, request) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.put(`/${id}`, request);
        return response;
    } catch (error) {
        return error.response;
    }
};