import { render } from '../../../../test-utils/test-utils'
import {
    TransactionType,
    StockEntryTransactionForm,
} from './StockEntryTransactionForm'
import { stockEntryMockData } from '../../../../mock-api/stock-enties/stockEntriesMockData'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('checks stock entry transaction form', () => {
    test('checks that form on submit can be triggered with the correct values when transaction type is sell', async () => {
        const mockOnSubmit = jest.fn()
        render(
            <StockEntryTransactionForm
                stockEntry={stockEntryMockData}
                walletBalance={100000}
                transactionType={TransactionType.sell}
                onSubmit={mockOnSubmit}
            />
        )
        userEvent.click(screen.getByRole('button', { name: /Sell Stock/i }))
        await waitFor(() => {
            expect(mockOnSubmit.mock.calls[0][0]).toStrictEqual({
                stockId: '639ae9ff97bebca9df8c9d1d',
                stockTicker: undefined,
                amount: '2',
            })
        })
    })
    test('checks that form on submit can be triggered with the correct values when transaction type is buy', async () => {
        const mockOnSubmit = jest.fn()
        render(
            <StockEntryTransactionForm
                stockEntry={stockEntryMockData}
                walletBalance={100000}
                transactionType={TransactionType.buy}
                onSubmit={mockOnSubmit}
            />
        )
        userEvent.type(screen.getByDisplayValue(0), "2" )
        userEvent.click(screen.getByRole('button', { name: /Buy Stock/i }))
        await waitFor(() => {
            expect(mockOnSubmit.mock.calls[0][0]).toStrictEqual({
                stockId: '639ae9ff97bebca9df8c9d1d',
                stockTicker: undefined,
                amount: '02',
            })
        })
    })
})
