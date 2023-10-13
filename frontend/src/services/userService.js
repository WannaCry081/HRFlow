import axios from "axios";
import { USER_URL } from "@Utils/constants";

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
