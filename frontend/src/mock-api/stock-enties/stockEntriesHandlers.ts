import { rest } from 'msw'

const postSellStock = rest.post(
    'http://localhost/stock-entries/sell/:id',
    (req, res, context) => {
        return res(context.status(200))
    }
)
const postBuyStock = rest.post(
    'http://localhost/stock-entries/add/:id',
    (req, res, context) => {
        return res(context.status(200))
    }
)
export const stockEntriesHandlers = [postSellStock, postBuyStock]
