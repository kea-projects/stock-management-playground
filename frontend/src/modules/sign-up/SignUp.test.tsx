import { screen } from '@testing-library/react'
import { render } from '../../test-utils/test-utils'
import { SignUp } from './SignUp'

describe('Sign up  test', () => {
    test('checks that sign up is generated with the right title', () => {
        render(<SignUp />)
        screen.getByText('Fill your profile')
        screen.getByPlaceholderText('Email')
        screen.getByPlaceholderText('Full name')
        screen.getByPlaceholderText('Password')
        screen.getByPlaceholderText('Confirm password')
        screen.getByRole('button', {
            name: /Sign up/i,
        })
    })
})
