import { render } from '../../../../../../test-utils/test-utils'
import {
    TransactionType,
    StockEntryTransactionForm,
} from './StockEntryTransactionForm'
import { stockEntryMockData } from '../../../../../../mock-api/stock-enties/stockEntriesMockData'
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
                stockId: '638f407c12da9709c4242f4d',
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
        userEvent.click(screen.getByRole('button', { name: /Buy Stock/i }))
        await waitFor(() => {
            expect(mockOnSubmit.mock.calls[0][0]).toStrictEqual({
                stockId: '638f407c12da9709c4242f4d',
                stockTicker: undefined,
                amount: '2',
            })
        })
    })
})
