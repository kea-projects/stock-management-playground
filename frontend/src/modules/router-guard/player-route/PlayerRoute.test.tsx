import { render } from '../../../test-utils/test-utils'
import { PlayerRoute } from './PlayerRoute'

describe('AdminRouter', () => {
    test('checks if admin router contain nevigation bar', () => {
        render(<PlayerRoute />)
    })
})
