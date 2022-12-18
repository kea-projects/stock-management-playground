import { render } from '../../../test-utils/test-utils'
import { WalletsStatusCard } from './WalletsStatusCard'
import { screen } from '@testing-library/react'
import { mockResponseForWalletsMe } from "../../../mock-api/wallets/walletsMockData";

describe('checks wallets card status', () => {
    test('checks if card shows fields', async () => {
        render(<WalletsStatusCard wallets={mockResponseForWalletsMe}/>)
        screen.getByText('Wallets Overview')
        screen.getByText('Your available cash')
        await screen.findByText('$100293.00')
    })
})
