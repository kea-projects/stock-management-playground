import { render } from '../../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { Homepage } from './Homepage'

describe('Guest homepage', () => {
    test('checks if homepage for guest is render correctly', () => {
        render(<Homepage />)
        screen.getByText('Sign in with your password')
    })
})
