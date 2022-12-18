import { StockEntry } from '../../api/client'

export const stockEntryMockData: StockEntry = {
    _id: '639ae9ff97bebca9df8c9d1d',
    amount: 2,
    paid_price: 287.9779486269498,
    stock: {
        _id: '638f407c12da9709c4242f4d',
        name: 'AAPL',
        stock_ticker: 'AAPL',
        current_price: 137.3005817358929,
        description: 'Stock fetched from Finnhub API',
        percentage_change: -1.6132989752647569,
        last_updated: '2022-12-15T11:15:19.179000',
        history: [],
        external_fetch: true,
    },
}
