import axiosInstance from "../api/axiosInstance";

export const loginUser = async (email, password) => {

    const response = await axiosInstance.post(
        "auth/login",
        {
            email,
            password
        }
    );

    console.log(
        "LOGIN API RESPONSE =",
        response.data
    );

    // Backend directly returns JWT string
    if (typeof response.data === "string") {
        return response.data;
    }

    // Backend returns { token: "..." }
    if (response.data.token) {
        return response.data.token;
    }

    // Backend returns { accessToken: "..." }
    if (response.data.accessToken) {
        return response.data.accessToken;
    }

    // Backend returns { jwtToken: "..." }
    if (response.data.jwtToken) {
        return response.data.jwtToken;
    }

    throw new Error(
        "JWT token not found in login response"
    );
};


export const registerUser = async (userData) => {

    const response =
        await axiosInstance.post(
            "auth/register",
            userData
        );

    return response.data;
};