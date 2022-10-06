import { renderWithRoute } from '../../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { GuestRouter } from './GuestRouter'

describe('checks guest router', () => {
    test('check if home url shows the login component', () => {
        renderWithRoute(<GuestRouter />, '/')
        screen.getByText('Sign in with your password')
    })
    test('checks if registration page is shown when url has /signup', () => {
        renderWithRoute(<GuestRouter />, '/sign-up')
        screen.getByText('Fill your profile')
    })
    test('check if random url shows the login component', () => {
        renderWithRoute(<GuestRouter />, '/random-staff')
        screen.getByText('Sign in with your password')
    })
})
