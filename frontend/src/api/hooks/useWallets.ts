import { useState } from 'react'
import { WalletsApi } from '../client'
import { BaseConfig } from '../client-config/baseConfig'
import { axiosInstance } from '../client-config/axiosConfig'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateWalletMeValues } from '../../modules/wallets/create-wallet/CreateWallet'

const useClient = () => {
    const [walletsApi] = useState(
        () => new WalletsApi(BaseConfig, BaseConfig.basePath, axiosInstance)
    )
    return walletsApi
}

export const WalletsKeys = {
    allWalletsMe: 'ALL_WALLETS_ME',
    singleWalletMe: 'SINGLE_WALLET_ME',
}

export const useGetAllWalletsMe = () => {
    const client = useClient()
    return useQuery([WalletsKeys.allWalletsMe], () =>
        client.readSelfWalletsWalletsMeGet().then((response) => response.data)
    )
}

export const useGetSingleWallet = (walletId: string) => {
    const client = useClient()
    return useQuery([WalletsKeys.singleWalletMe, walletId], () =>
        client
            .readSelfWalletsByIdWalletsMeWalletIdGet(walletId)
            .then((response) => response.data)
    )
}

export const useCreateNewWallet = () => {
    const client = useClient()
    return useMutation(({ nickname }: CreateWalletMeValues) =>
        client.createSelfWalletWalletsMePost({ nickname: nickname })
    )
}
