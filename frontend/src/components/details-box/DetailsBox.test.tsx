import { render } from '../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { DetailsBox } from './DetailsBox'

describe('checks that Details box', () => {
    test('checks that DetailsBox can get children and present their content', () => {
        render(
            <DetailsBox>
                <div>test text</div>
            </DetailsBox>
        )
        screen.getByText('test text')
    })
})
