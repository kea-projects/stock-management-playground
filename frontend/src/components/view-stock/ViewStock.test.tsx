import { render } from '../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { ViewStock } from './ViewStock'
import React from 'react'
jest.mock('recharts', () => {
    const OriginalRechartsModule = jest.requireActual('recharts')

    return {
        ...OriginalRechartsModule,
        ResponsiveContainer: ({ children }: any) => (
            <div
                className="recharts-responsive-container"
                style={{ width: 800, height: 100 }}
            >
                {children}
            </div>
        ),
    }
})

describe('checks View Stock', () => {
    test('checks if view stock shows the current graph', () => {
        /**need to fix this test as wll*/
        render(<ViewStock stockTicker="TEST" />)
        screen.getByText('TEST')
    })
})
