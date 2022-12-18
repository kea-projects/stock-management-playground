import { render } from '../../test-utils/test-utils'
import { Graph } from './Graph'
import React from 'react'

jest.mock('recharts', () => {
    const OriginalRechartsModule = jest.requireActual('recharts')

    return {
        ...OriginalRechartsModule,
        ResponsiveContainer: ({ height, children }: any) => (
            <div
                className="recharts-responsive-container"
                style={{ width: 800, height }}
            >
                {children}
            </div>
        ),
    }
})
describe('checks graph visualisation', () => {
    /**needs to make this test work*/
    test('checks if x entities and y entities are being shown', async () => {
        const data = [
            { price: 100, name: 'a' },
            { price: 160, name: 'b' },
            { price: 190, name: 'c' },
            { price: 110, name: 'd' },
        ]
        render(
            <Graph
                data={data}
                dataKeyY="price"
                dataKeyX="name"
                height="100px"
                width="100px"
            />
        )
        // await screen.getByText('a')
        // await screen.getByText('b')
        // await screen.getByText('c')
        // await screen.getByText('d')
    })
})
