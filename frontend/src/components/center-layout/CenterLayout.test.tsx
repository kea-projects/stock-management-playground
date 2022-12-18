import { render } from '../../test-utils/test-utils'
import { CenterLayout } from './CenterLayout'
import { screen } from '@testing-library/react'

describe('center layout test', () => {
    test('checks that component render correctly', () => {
        render(
            <CenterLayout>
                <div>hello world</div>
            </CenterLayout>
        )
        screen.getByText('hello world')
    })
})
