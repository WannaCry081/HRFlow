import axios from "axios";
import { NOTIFICATION_URL } from "/src/lib/constants";

const axiosInstance = (token) => {
    return axios.create({
        baseURL: NOTIFICATION_URL,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
}

export const GetNotificationsApi = async (token) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.get("");
        return response;
    } catch (error) {
        return error.response;
    }
}

export const CreateNotificationApi = async (token, request) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.post("", request);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const UpdateNotificationApi = async (token, notificationId, request) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.put(`${notificationId}`, request);
        return response;
    } catch (error) {
        return error.response;
    }
}


export const DeleteNotificationApi = async (token, notificationId) => {
    const instance = axiosInstance(token);

    try {
        const response = await instance.delete(`${notificationId}`);
        return response;
    } catch (error) {
        return error.response;
    }
}
