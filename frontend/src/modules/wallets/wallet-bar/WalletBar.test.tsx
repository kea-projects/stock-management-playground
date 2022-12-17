import { render } from '../../../test-utils/test-utils'
import { WalletBar } from './WalletBar'
import { mockResponseForWalletsMe } from '../../../mock-api/wallets/walletsMockData'
import { screen } from '@testing-library/react'

describe('checks that wallet bar shows wallet details', () => {
    test('check wallet data', () => {
        render(<WalletBar wallet={mockResponseForWalletsMe[0]} />)
        screen.getByText('AAPL')
        screen.getByText('MSFT')
        screen.getByText('TSLA')
        screen.getByText('$100000.00')
        screen.getByText('mainWallet')
    })
})
