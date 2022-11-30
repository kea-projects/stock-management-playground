import { render } from '../../../test-utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

const mockOnSubmit = jest.fn()

describe('login form', () => {
    test('checks that input field can hold value', () => {
        render(<LoginForm onSubmit={mockOnSubmit} />)
        const inputUsername = screen.getByPlaceholderText('Email')
        const inputPassword = screen.getByPlaceholderText('Password')
        userEvent.type(inputUsername, 'testUser')
        userEvent.type(inputPassword, 'testPassword')
        expect(inputUsername).toHaveValue('testUser')
        expect(inputPassword).toHaveValue('testPassword')
    })
    test('checks if input values are sent to onSubmit function', async () => {
        render(<LoginForm onSubmit={mockOnSubmit} />)
        userEvent.type(screen.getByPlaceholderText('Email'), 'testUsername')
        userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword')
        userEvent.click(screen.getByText('Sign in'))
        await waitFor(() => {
            const mockResult = mockOnSubmit.mock.calls[0][0]
            expect(mockResult).toStrictEqual({
                password: 'testPassword',
                email: 'testUsername',
                rememberMe: false,
            })
        })
    })
    test('checks if error messages displayed when username input field is empty', async () => {
        render(<LoginForm onSubmit={mockOnSubmit} />)
        userEvent.type(screen.getByPlaceholderText('Password'), 'testPassword')
        userEvent.click(screen.getByText('Sign in'))
        await waitFor(() => {
            screen.getByText('This field is required')
        })
    })
    test('checks if error messages displayed when password input field is empty', async () => {
        render(<LoginForm onSubmit={mockOnSubmit} />)
        userEvent.type(screen.getByPlaceholderText('Email'), 'testUsername')
        userEvent.click(screen.getByText('Sign in'))
        await waitFor(() => {
            screen.getByText('This field is required')
        })
    })
})
