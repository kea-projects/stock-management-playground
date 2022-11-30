import { rest } from 'msw'
import { mockResponseForWalletsMe } from './walletsMockData'

const getWalletByMe = rest.get(
    'http://localhost/wallets/me',
    (req, res, context) => {
        return res(context.json(mockResponseForWalletsMe))
    }
)

export const walletsHandler = [getWalletByMe]
