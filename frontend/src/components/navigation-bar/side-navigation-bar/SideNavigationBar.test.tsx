import { render } from '../../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { SideNavigationBar } from './SideNavigationBar'

describe('Checks side navigation bar', () => {
    test('checks that all side bar options shown correctly', () => {
        render(<SideNavigationBar />)
        screen.getByText('Home')
        screen.getByText('Transactions')
        screen.getByText('Wallets')
        screen.getByText('Help')
    })
})
