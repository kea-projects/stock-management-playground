import { screen, waitFor } from '@testing-library/react'
import { render } from '../../test-utils/test-utils'
import { SignUp } from './SignUp'
import userEvent from '@testing-library/user-event'

describe('Sign up  test', () => {
    test('checks that sign up is generated with the right title', () => {
        render(<SignUp onSuccess={() => null} />)
        screen.getByText('Fill your profile')
        screen.getByPlaceholderText('Email')
        screen.getByPlaceholderText('Full name')
        screen.getByPlaceholderText('Password')
        screen.getByPlaceholderText('Confirm password')
        screen.getByRole('button', {
            name: /Sign up/i,
        })
    })
    test('checks if sign up can be completed', async () => {
        const mockOnSuccess = jest.fn()
        render(<SignUp onSuccess={mockOnSuccess} />)
        userEvent.type(
            screen.getByPlaceholderText('Email'),
            'testEmail@example.com'
        )
        userEvent.type(screen.getByPlaceholderText('Full name'), 'Test user')
        userEvent.type(
            screen.getByPlaceholderText('Confirm password'),
            'abcd1234'
        )
        userEvent.type(screen.getByPlaceholderText('Password'), 'abcd1234')
        userEvent.click(screen.getByText('I accept the'))
        userEvent.click(
            screen.getByRole('button', {
                name: /Sign up/i,
            })
        )
        await waitFor(() => {
            expect(mockOnSuccess).toBeCalled()
        })
    })
})
