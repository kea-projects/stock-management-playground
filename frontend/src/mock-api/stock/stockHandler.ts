import { rest } from 'msw'
import { stockMockData, stocksSymbolsMockData } from './stockMockData'

const getStocks = rest.get('http://localhost/stocks', (req, res, context) => {
    return res(context.json(stockMockData))
})
const getStocksSymbols = rest.get(
    'http://localhost/stocks/symbols/',
    (req, res, context) => {
        return res(context.json(stocksSymbolsMockData))
    }
)
const getStock = rest.get(
    'http://localhost/stocks/symbol/:stockId',
    (req, res, context) => {
        return res(
            context.json(
                stockMockData.find(
                    (stock) => stock.stock_ticker === req.params.stockId
                )
            )
        )
    }
)

export const stockHandler = [getStock, getStocks, getStocksSymbols]
