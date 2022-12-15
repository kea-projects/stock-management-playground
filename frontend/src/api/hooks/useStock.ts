import { useState } from 'react'
import { StocksApi } from '../client'
import { BaseConfig } from '../client-config/baseConfig'
import { axiosInstance } from '../client-config/axiosConfig'
import { useQuery } from '@tanstack/react-query'

const useClient = () => {
    const [stockApi] = useState(
        () => new StocksApi(BaseConfig, BaseConfig.basePath, axiosInstance)
    )
    return stockApi
}

export const StockKeys = {
    stock: 'STOCK',
    stockSymbols: 'STOCK_SYMBOLS',
}

interface GetStock {
    stockTicker: string
}

export const useGetStock = ({ stockTicker }: GetStock) => {
    const client = useClient()
    return useQuery([StockKeys.stock, stockTicker], () =>
        client
            .readStockBySymbolStocksSymbolStockSymbolGet(stockTicker)
            .then((response) => response.data)
    )
}

export const useGetStocksSymbols = () => {
    const client = useClient()
    return useQuery([StockKeys.stockSymbols], () =>
        client
            .readStockSymbolsStocksSymbolsGet()
            .then((response) => response.data)
    )
}
