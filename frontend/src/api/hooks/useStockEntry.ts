import { useState } from 'react'
import { AmountData, CreateStockEntryData, StockEntriesApi } from '../client'
import { BaseConfig } from '../client-config/baseConfig'
import { axiosInstance } from '../client-config/axiosConfig'
import { useMutation } from '@tanstack/react-query'

const useClient = () => {
    const [stockEntryApi] = useState(
        () =>
            new StockEntriesApi(BaseConfig, BaseConfig.basePath, axiosInstance)
    )
    return stockEntryApi
}
export interface SellStockEntryContent {
    stockId: string
    amount: AmountData
}

export const useSellStockEntry = () => {
    const client = useClient()
    return useMutation(({ stockId, amount }: SellStockEntryContent) =>
        client.sellAmountOfStockEntryStockEntriesSellStockEntryIdPost(
            stockId,
            amount
        )
    )
}
export const useBuyStockEntry = () => {
    const client = useClient()
    return useMutation(({ stockId, amount }: SellStockEntryContent) =>
        client.buyMoreStockEntryStockEntriesAddStockEntryIdPost(stockId, amount)
    )
}
export const useBuyNewStockEntry = () => {
    const client = useClient()
    return useMutation((createStockEntryData: CreateStockEntryData) =>
        client.createStockEntryStockEntriesPost(createStockEntryData)
    )
}


