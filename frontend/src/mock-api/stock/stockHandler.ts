import { rest } from 'msw'
import { stockMockData, stocksSymbolsMockData } from './stockMockData'

const getStock = rest.get(
    'http://localhost/stocks/symbol/:stockId',
    (req, res, context) => {
        if (req.params.stockId === 'TEST')
            return res(context.json(stockMockData[0]))
        else return res(context.status(400))
    }
)
const getStocks = rest.get('http://localhost/stocks', (req, res, context) => {
    return res(context.json(stockMockData))
})
const getStocksSymbols = rest.get(
    'http://localhost/stocks/symbols/',
    (req, res, context) => {
        return res(context.json(stocksSymbolsMockData))
    }
)
export const stockHandler = [getStock, getStocks, getStocksSymbols]
