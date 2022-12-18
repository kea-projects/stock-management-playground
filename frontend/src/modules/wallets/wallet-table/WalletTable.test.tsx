import { render } from '../../../test-utils/test-utils'
import { mockResponseForWalletsMe } from '../../../mock-api/wallets/walletsMockData'
import { screen } from '@testing-library/react'
import { WalletTable } from './WalletTable'

describe('checks that table is loaded', () => {
    test('checks headers of table', () => {
        render(<WalletTable wallet={mockResponseForWalletsMe[0]} />)
        screen.getByText('Stock Ticker')
        screen.getByText('Current Price')
        screen.getByText('Amount')
        screen.getByText('Paid Price')
    })
    test('checks that table data is shown', () => {
        render(<WalletTable wallet={mockResponseForWalletsMe[0]} />)
        mockResponseForWalletsMe[0].stock_entries?.forEach((stock) => {
            screen.getByText(stock.stock.stock_ticker)
            screen.getByText('$' + stock.stock.current_price?.toFixed(2))
            screen.getByText(stock.amount)
            screen.getByText('$' + stock.paid_price.toFixed(2))
        })
        expect(screen.getAllByRole('button', { name: /Buy/i }).length).toBe(
            mockResponseForWalletsMe.length
        )
        expect(screen.getAllByRole('button', { name: /Sell/i }).length).toBe(
            mockResponseForWalletsMe.length
        )
    })
})
