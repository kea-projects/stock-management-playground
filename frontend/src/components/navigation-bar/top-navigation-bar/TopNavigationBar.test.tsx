import { renderWithRoute } from '../../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { TopNavigationBar } from './TopNavigationBar'
import userEvent from '@testing-library/user-event'

describe('checks if top navigation bar', () => {
    test('shown with user name and page header', () => {
        renderWithRoute(<TopNavigationBar fullName={'Test User'} />, '/')
        screen.getByText('Test User')
        screen.getByText('Home')
    })
    test('checks that players header is clickable and shown logout button', () => {
        renderWithRoute(<TopNavigationBar fullName={'Test User'} />, '/')
        userEvent.click(screen.getByRole('button', { name: /Test User/i }))
        screen.getByRole('button', { name: /Log Out/i })
    })
})
