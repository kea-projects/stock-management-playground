import { useState } from 'react'
import { WalletsApi } from '../client'
import { BaseConfig } from '../client-config/baseConfig'
import { axiosInstance } from '../client-config/axiosConfig'
import { useQuery } from '@tanstack/react-query'

const useClient = () => {
    const [walletsApi] = useState(
        () => new WalletsApi(BaseConfig, BaseConfig.basePath, axiosInstance)
    )
    return walletsApi
}

export const WalletsKeys = {
    allWalletsMe: 'ALL_WALLETS_ME',
}

export const useGetAllWalletsMe = () => {
    const client = useClient()
    return useQuery([WalletsKeys.allWalletsMe], () =>
        client.readSelfWalletsWalletsMeGet().then((response) => response.data)
    )
}