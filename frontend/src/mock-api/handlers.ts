import { authHandler } from './auth/authHandler'
import { userHandler } from './users/userHandler'
import { walletsHandler } from './wallets/walletsHandler'

export const interceptorUrl = 'http://localhost'

export const handlers = [...authHandler, ...userHandler, ...walletsHandler]
