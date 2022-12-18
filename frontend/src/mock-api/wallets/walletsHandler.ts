import { rest } from 'msw'
import { mockResponseForWalletsMe } from './walletsMockData'

const getWalletByMe = rest.get(
    'http://localhost/wallets/me',
    (req, res, context) => {
        return res(context.json(mockResponseForWalletsMe))
    }
)

const getWalletById = rest.get(
    'http://localhost/wallets/me/:id',
    (req, res, context) => {
        const result = mockResponseForWalletsMe.find(
            (wallet) => wallet._id === req.params.id
        )
        if (result) return res(context.json(result))
        else return res(context.status(422))
    }
)
export const walletsHandler = [getWalletByMe, getWalletById]
