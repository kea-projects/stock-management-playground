import { render } from '../../../test-utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignUpForm } from './SignUpForm'

describe('Test sign up form', () => {
    test('checks if input fields can be filled and triggered the on submit', async () => {
        const mockOnSubmit = jest.fn()
        render(
            <SignUpForm isLoading={false} apiError="" onSubmit={mockOnSubmit} />
        )
        userEvent.type(screen.getByPlaceholderText('Full name'), 'Test user')
        userEvent.type(
            screen.getByPlaceholderText('Email'),
            'testEmail@example.com'
        )
        userEvent.type(screen.getByPlaceholderText('Password'), 'abcd1234')
        userEvent.type(
            screen.getByPlaceholderText('Confirm password'),
            'abcd1234'
        )
        userEvent.click(screen.getByText('I accept the'))
        userEvent.click(
            screen.getByRole('button', {
                name: /Sign up/i,
            })
        )
        await waitFor(() => {
            expect(mockOnSubmit).toBeCalled()
        })
        await waitFor(() => {
            expect(mockOnSubmit.mock.calls[0][0]).toStrictEqual({
                email: 'testEmail@example.com',
                password: 'abcd1234',
                confirmPassword: 'abcd1234',
                fullName: 'Test user',
                acceptTerms: true,
            })
        })
    })
    test('checks that error messages', async () => {
        const mockOnSubmit = jest.fn()
        render(
            <SignUpForm isLoading={false} apiError="" onSubmit={mockOnSubmit} />
        )
        userEvent.click(
            screen.getByRole('button', {
                name: /Sign up/i,
            })
        )
        await waitFor(() => {
            screen.getByText(
                'Please confirm that you read the term of use and the privacy policy'
            )
            expect(screen.getAllByText('This field is required').length).toBe(4)
        })
    })
    test('checks if password not match', async () => {
        const mockOnSubmit = jest.fn()
        render(
            <SignUpForm isLoading={false} apiError="" onSubmit={mockOnSubmit} />
        )
        userEvent.type(screen.getByPlaceholderText('Password'), 'abcd1234')
        userEvent.type(
            screen.getByPlaceholderText('Confirm password'),
            'abcd1235'
        )
        userEvent.click(
            screen.getByRole('button', {
                name: /Sign up/i,
            })
        )
        await waitFor(() => {
            expect(
                screen.getAllByText('Your two passwords do not match').length
            ).toBe(2)
        })
    })
})
