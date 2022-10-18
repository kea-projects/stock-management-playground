import { authHandler } from './auth-api/authHandler'

export const interceptorUrl = 'http://localhost'

export const handlers = [...authHandler]
