import { render } from '../../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { GuestRoute } from './GuestRoute'

describe('Guest homepage', () => {
    test('checks if homepage for guest is render correctly', () => {
        render(<GuestRoute />)
        screen.getByText('Sign in with your password')
    })
})
