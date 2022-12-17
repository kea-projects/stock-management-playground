import { render } from '../../../../test-utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import { BuyNewStock } from './BuyNewStock'
import userEvent from '@testing-library/user-event'

describe('checks that buy new stock is generated correctly', () => {
    test('checks that input fields are being generated', () => {
        render(<BuyNewStock walletId={'walletId'} onSuccess={() => null} />)
        screen.getByDisplayValue('Stock name')
        screen.getByPlaceholderText('amount')
        screen.getByRole('button', { name: /Buy Stock/i })
    })
    test('checks that when fields are being filled correctly on success is being triggered', async () => {
        const mockOnSuccess = jest.fn()
        render(<BuyNewStock walletId={'walletId'} onSuccess={mockOnSuccess} />)
        userEvent.type(screen.getByPlaceholderText('amount'), '10')
        const stockOption: HTMLOptionElement = await screen.findByRole(
            'option',
            { name: /AAPL/i }
        )
        userEvent.selectOptions(screen.getByDisplayValue('Stock name'), [
            stockOption.value,
        ])
        userEvent.type(screen.getByDisplayValue('0'), '2')
        userEvent.click(screen.getByRole('button', { name: /Buy Stock/i }))
        await waitFor(() => {
            expect(mockOnSuccess).toBeCalled()
        })
    })
})
