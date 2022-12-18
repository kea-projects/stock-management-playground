import { render } from '../../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SingleWalletStatusCard } from './SingleWalletStatusCard'

describe('check if single wallet status card is rendered correctly', () => {
    test('check that wallet name and balance is shown', async () => {
        render(
            <SingleWalletStatusCard
                walletId={'walletId'}
                onClick={() => null}
            />
        )
        await screen.findByText('mainWallet')
        await screen.findByText('$100000.00')
    })
    test('check that wallet is response for onClick event', async () => {
        const mockOnSubmit = jest.fn()
        render(
            <SingleWalletStatusCard
                walletId={'walletId'}
                onClick={mockOnSubmit}
            />
        )
        userEvent.click(await screen.findByText('mainWallet'))
        expect(mockOnSubmit).toBeCalled()
    })
})
