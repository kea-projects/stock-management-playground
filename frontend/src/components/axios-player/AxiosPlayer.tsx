import { ReactNode, useContext } from "react";
import { UserContext } from '../../provider/user-provider/UserProvider'
import { axiosInstance } from '../../api/client-config/axiosConfig'
import * as Sentry from '@sentry/react'

interface AxiosAdminProps {
    children: ReactNode
}
/*set jwt for logged in users*/
export const AxiosPlayer = ({ children }: AxiosAdminProps) => {
    const { userDetail } = useContext(UserContext)
    axiosInstance.interceptors.request.use(
        async (config) => {
            if (config && config.headers) {
                config.headers[
                    'Authorization'
                ] = `${userDetail.tokenType} ${userDetail.token}`
            }
            return config
        },
        async (error) => {
            return Promise.reject(error)
        }
    )
    axiosInstance.interceptors.response.use(
        async (response) => {
            Sentry.setExtra('response_status', response.status)
            Sentry.setExtra('response_data', JSON.stringify(response.data))
            Sentry.captureMessage('API response')
            return response
        },
        async (error) => {
            return Promise.reject(error)
        }
    )
    return <>{children}</>
}
