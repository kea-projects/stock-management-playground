import { render } from '../../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { CreateWallet } from './CreateWallet'

describe('checks create wallet', () => {
    test('checks if create new wallet button is shown', () => {
        render(<CreateWallet />)
        screen.getByRole('button', {
            name: /Create Wallet/i,
        })
    })
})
