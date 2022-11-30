import { Wallet } from '../../api/client'

export const mockResponseForWalletsMe: Wallet[] = [
    {
        _id: '1',
        nickname: 'mainWallet',
        balance: 100000,
    },
    {
        _id: '2',
        nickname: 'secondary1',
        balance: 93,
    },
    {
        _id: '3',
        nickname: 'secondaryWallet2',
        balance: 200,
    },
]
