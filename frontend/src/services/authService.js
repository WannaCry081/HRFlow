import axios from "axios";
import { AUTH_URL } from "/src/lib/constants.js";

const axiosInstance = axios.create({
    baseURL : AUTH_URL,
    headers : {
        "Content-Type" : "application/json"
    }
});

export const RegisterUserApi = async (request) => {
    try {
        const response = await axiosInstance.post("/register", request);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const LoginUserApi = async (request) => {
    try {
        const response = await axiosInstance.post("/login", request);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const ForgotPasswordApi = async (request) => {
    try {
        const response = await axiosInstance.post("/forgot-password", request);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const VerifyCodeApi = async (request) => {
    try {
        const response = await axiosInstance.post("/forgot-password/verification",request);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const SendEmailToAdminApi = async (request) => {
    try {
        const response = await axiosInstance.post("/send-email", request);
        return response;
    } catch (error){
        return error.response;
    }
};