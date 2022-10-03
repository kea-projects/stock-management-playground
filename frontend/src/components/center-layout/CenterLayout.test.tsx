import { render } from '../../test-utils/test-utils'
import { CenterLayout } from './CenterLayout'

describe('center layout test', () => {
    test('checks that component render correctly', () => {
        render(
            <CenterLayout>
                <div>hello world</div>
            </CenterLayout>
        )
    })
})
