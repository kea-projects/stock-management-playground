import { renderWithRoute } from '../../../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { Wallets } from './wallets'

describe('checks that all the availble wallets are shown on screen', () => {
    test('checks that wallet name and balance is shown', async () => {
        renderWithRoute(<Wallets />, '')
        await screen.findByText('mainWallet')
        await screen.findByText('$100000.00')
        await screen.findByText('secondary1')
        await screen.findByText('$93.00')
        await screen.findByText('secondaryWallet2')
        await screen.findByText('$200.00')
    })
})
