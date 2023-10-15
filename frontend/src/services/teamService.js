import axios from "axios";
import { TEAM_URL } from "@Utils/constants.js";

const axiosInstance = (token) => axios.create({
    baseURL : TEAM_URL,
    headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
});

export const JoinTeamApi = async (token, request) => {
    const instance = axiosInstance(token);
    
    try {
        const response = await instance.put("", request);
        return response;
    } catch (error) {
        return error.response;
    }
};


export const CreateTeamApi = async (token, request) => {
    const instance = axiosInstance(token);
    
    try {
        const response = await instance.post("", request);
        return response;
    } catch (error) {
        return error.response;
    }
};
