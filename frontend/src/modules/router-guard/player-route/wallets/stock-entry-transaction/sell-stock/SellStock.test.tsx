import { render } from '../../../../../../test-utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import { StockEntry } from '../../../../../../api/client'
import { SellStock } from './SellStock'
import { stockEntryMockData } from '../../../../../../mock-api/stock-enties/stockEntriesMockData'
import userEvent from '@testing-library/user-event'

describe('checks if sell stock is generated correctly', () => {
    test('checks if sell stock get the correct stock and the max amount for sell', () => {
        const stockEntry: StockEntry = stockEntryMockData
        render(
            <SellStock
                stockEntry={stockEntry}
                walletBalance={100000}
                onSuccess={() => null}
            />
        )
        screen.getByDisplayValue(stockEntry.amount)
        screen.getByDisplayValue(stockEntry.stock.stock_ticker)
    })
    test('checks that sell stock can be completed', async () => {
        const mockOnSubmit = jest.fn()
        render(
            <SellStock
                stockEntry={stockEntryMockData}
                walletBalance={100000}
                onSuccess={mockOnSubmit}
            />
        )
        userEvent.click(screen.getByRole('button', { name: /Sell Stock/i }))
        await waitFor(() => expect(mockOnSubmit).toBeCalled())
    })
})
