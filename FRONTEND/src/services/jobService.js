import api from "./api";

export const getAllJobs = async () => {

    const response = await api.get("/jobs");

    return response.data;
};