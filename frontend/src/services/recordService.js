import axios from "axios";
import { RECORD_URL } from "@Utils/constants.js";

const axiosInstance = (token) => axios.create({
  baseURL : RECORD_URL,
  headers : {
      Authorization : `Bearer ${token}`,
      "Content-Type" : "application/json"
  }
});

export const GetRecordApi = async (token) => {
    const instance = axiosInstance(token);
    
    try {
        const response = await instance.get("");
        return response;
    } catch (error) {
        return error.response;
    }
};


export const CreateRecordApi = async (token, request) => {
    const instance = axiosInstance(token);
    
    try {
        const response = await instance.post("", request);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const UpdateRecordApi = async (token, recordId, request) => {
  const instance = axiosInstance(token);
  
  try {
      const response = await instance.patch(`${recordId}`, request);
      return response;
  } catch (error) {
      return error.response;
  }
};