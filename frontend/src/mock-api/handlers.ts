import { authHandler } from './auth/authHandler'
import { userHandler } from './users/userHandler'
import { walletsHandler } from './wallets/walletsHandler'
import { stockHandler } from './stock/stockHandler'
import { stockEntriesHandlers } from './stock-enties/stockEntriesHandlers'

export const interceptorUrl = 'http://localhost'

export const handlers = [
    ...authHandler,
    ...userHandler,
    ...walletsHandler,
    ...stockHandler,
    ...stockEntriesHandlers,
]
