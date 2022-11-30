import { useState } from 'react'
import { UsersApi } from '../client'
import { BaseConfig } from '../client-config/baseConfig'
import { axiosInstance } from '../client-config/axiosConfig'
import { useQuery } from '@tanstack/react-query'

export const UserKeys = {
    userMeKey: 'USER_ME_KEY',
}
const useClient = () => {
    const [userApi] = useState(
        () => new UsersApi(BaseConfig, BaseConfig.basePath, axiosInstance)
    )
    return userApi
}

export const useGetUserMe = () => {
    const client = useClient()
    return useQuery([UserKeys.userMeKey], () =>
        client.readSelfUserUsersMeGet().then((response) => {
            return response.data
        })
    )
}
