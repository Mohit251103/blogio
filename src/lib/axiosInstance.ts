import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_APP_BACKEND_URL
})

export default axiosInstance;