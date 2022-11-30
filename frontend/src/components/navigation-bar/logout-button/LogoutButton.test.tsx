import { LogoutButton } from './LogoutButton'
import { render } from '../../../test-utils/test-utils'

describe('checks logout button', () => {
    test('checks if text is shown correctly', () => {
        render(<LogoutButton />)
    })
})
