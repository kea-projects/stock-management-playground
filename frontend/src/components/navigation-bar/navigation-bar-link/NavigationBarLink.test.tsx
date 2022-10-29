import { renderWithRoute } from '../../../test-utils/test-utils'
import { screen, render } from '@testing-library/react'
import { NavigationBarLink } from './NavigationBarLink'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe('navigation bar link', () => {
    test('checks if navigation bar link gets load correctly', () => {
        renderWithRoute(
            <NavigationBarLink text={'test'} destination={''} />,
            '/'
        )
        screen.getByText('test')
    })
    test('check if url is changed after click', () => {
        const history = createMemoryHistory()
        render(
            <Router navigator={history} location={history.location}>
                <NavigationBarLink text={'test'} destination={'/test'} />
            </Router>
        )
        userEvent.click(screen.getByText('test'))
        expect(history.location.pathname).toBe('/test')
    })
})
