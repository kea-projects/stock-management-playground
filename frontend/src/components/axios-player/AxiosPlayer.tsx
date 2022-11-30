import { useContext } from 'react'
import { UserContext } from '../../provider/user-provider/UserProvider'
import { axiosInstance } from '../../api/client-config/axiosConfig'

interface AxiosAdminProps {
    children: React.ReactNode
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
    return <>{children}</>
}
