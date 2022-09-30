import { screen } from '@testing-library/react'

import { RouterGuard } from './RouterGuard'
import { renderWithUseContextUser } from '../../test-utils/test-utils'

describe('checks the guard functionality', () => {
    test('checks if the switch returns the proper routes for a guest user', () => {
        renderWithUseContextUser(<RouterGuard />)
        screen.getByText('Sign in with your password')
        // would like to test for this one as well, but I have difficulties with figuring out how to change the default screen size
        // screen.getByText('Welcome to the stock management playground!')
    })
    /* add tests for new routers*/
})
