import { render } from '../../../../test-utils/test-utils'
import { stockEntryMockData } from '../../../../mock-api/stock-enties/stockEntriesMockData'
import { screen, waitFor } from '@testing-library/react'
import { BuyStock } from './BuyStock'
import userEvent from '@testing-library/user-event'

describe('checks if buy stocks is generated correctly', () => {
    test('checks if buy stock generate with the right required stock and 0 on the amount', () => {
        render(
            <BuyStock
                stockEntry={stockEntryMockData}
                walletBalance={100000}
                onSuccess={() => null}
            />
        )
        screen.getByDisplayValue(0)
        screen.getByDisplayValue(stockEntryMockData.stock.stock_ticker)
        screen.getByRole('button', { name: /Buy Stock/i })
    })
    test('checks if buy stock with valid amount triggered on success', async () => {
        const mockOnSuccess = jest.fn()
        render(
            <BuyStock
                stockEntry={stockEntryMockData}
                walletBalance={100000}
                onSuccess={mockOnSuccess}
            />
        )
        userEvent.type(screen.getByDisplayValue('0'), '2')
        userEvent.click(screen.getByRole('button', { name: /Buy Stock/i }))
        await waitFor(() => {
            expect(mockOnSuccess).toBeCalled()
        })
    })
})
