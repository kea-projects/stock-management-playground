import axios from 'axios'

export const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
    async (config) => {
        /* if axios needs to add additional properties to axios*/
        return config
    },
    async (error) => {
        return Promise.reject(error)
    }
)
