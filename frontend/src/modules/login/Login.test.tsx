import { render } from '../../test-utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import { Login } from './Login'
import userEvent from '@testing-library/user-event'

describe('Login component', () => {
    test('Checks if login is being loaded with the correct form', () => {
        render(<Login onSuccess={() => null} />)
        screen.getByPlaceholderText('Email')
        screen.getByPlaceholderText('Password')
        screen.getByRole('button', {
            name: /Sign in/i,
        })
    })
    test('checks that login can be completed successfully', async () => {
        const mockOnSuccess = jest.fn()
        render(<Login onSuccess={mockOnSuccess} />)
        userEvent.type(
            screen.getByPlaceholderText('Email'),
            'correctCredential@email.com'
        )
        userEvent.type(
            screen.getByPlaceholderText('Password'),
            'correctPassword'
        )
        userEvent.click(screen.getByText('Sign in'))
        await waitFor(() => {
            expect(mockOnSuccess).toBeCalled()
        })
    })
    test('checks if error message is shown on incorrect input', async () => {
        render(<Login onSuccess={() => null} />)
        userEvent.type(
            screen.getByPlaceholderText('Email'),
            'incorrectCredential@email.com'
        )
        userEvent.type(
            screen.getByPlaceholderText('Password'),
            'incorrectPassword'
        )
        userEvent.click(screen.getByText('Sign in'))
        await waitFor(() => {
            screen.getByText('Invalid credentials, please try again')
        })
    })
    test('checks that error message for no input is being shown', async () => {
        render(<Login onSuccess={() => null} />)
        userEvent.click(screen.getByText('Sign in'))
        await waitFor(() => {
            expect(screen.getAllByText('This field is required').length).toBe(2)
        })
    })
})
