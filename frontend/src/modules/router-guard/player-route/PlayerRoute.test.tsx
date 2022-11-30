import { renderWithAxiosContext } from '../../../test-utils/test-utils'
import { PlayerRoute } from './PlayerRoute'
import { screen, waitFor } from '@testing-library/react'

describe('AdminRouter', () => {
    test('checks if admin router contain nevigation bar', async () => {
        renderWithAxiosContext(<PlayerRoute />, {
            token: 'verySecretBearerToken',
            tokenType: 'Bearer',
        })
        await screen.findByText('Test User')
    })
})
