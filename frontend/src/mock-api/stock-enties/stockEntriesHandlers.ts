import { rest } from 'msw'

const postBuyNewStock = rest.post(
  'http://localhost/stock-entries/',
  (req, res, context) => {
    return res(context.status(201))
  }
)
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

export const stockEntriesHandlers = [postSellStock, postBuyStock, postBuyNewStock]
