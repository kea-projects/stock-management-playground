import { useState } from 'react'
import { StocksApi } from '../client'
import { BaseConfig } from '../client-config/baseConfig'
import { axiosInstance } from '../client-config/axiosConfig'
import { useMutation, useQuery } from "@tanstack/react-query";

const useClient = () => {
    const [stockApi] = useState(
        () => new StocksApi(BaseConfig, BaseConfig.basePath, axiosInstance)
    )
    return stockApi
}

export const stockKeys = {
    stock: 'STOCK',
    stockSymbols: 'STOCK_SYMBOLS',
    allStocks: 'ALL_STOCKS',
}

interface GetStock {
    stockTicker: string
}

export const useGetStock = ({ stockTicker }: GetStock) => {
    const client = useClient()
    return useQuery([stockKeys.stock, stockTicker], () =>
        client
            .readStockBySymbolStocksSymbolStockSymbolGet(stockTicker)
            .then((response) => response.data)
    )
}

export const useGetAllStocks = () => {
    const client = useClient()
    return useQuery([stockKeys.allStocks], () =>
        client.readStocksStocksGet().then((response) => response.data)
    )
}

export const useGetStocksSymbols = () => {
    const client = useClient()
    return useQuery([stockKeys.stockSymbols], () =>
        client
            .readStockSymbolsStocksSymbolsGet()
            .then((response) => response.data)
    )
}
export interface StockByStockTickerInput {
  stockTicker: string
}
export const useGetStockByStockTicker = () => {
  const client = useClient()
  return useMutation(({stockTicker}: StockByStockTickerInput)=> client.readStockBySymbolStocksSymbolStockSymbolGet(stockTicker))
}
