import { rest } from 'msw'
import { mockResponseForUserMe } from './usersMockData'

const userMe = rest.get('http://localhost/users/me', (req, res, context) => {
    if (req.headers.all().authorization === 'Bearer verySecretBearerToken')
        return res(context.json(mockResponseForUserMe))
    else return res(context.status(403))
})

export const userHandler = [userMe]
