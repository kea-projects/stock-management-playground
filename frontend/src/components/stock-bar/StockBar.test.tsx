import { render } from '../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { StockBar } from './StockBar'

describe('Stock Bar test', () => {
    test('checks if stock graph can get stock name and show on screen', async () => {
        render(<StockBar stockTicker="TEST" onClick={()=>null}/>)
        await screen.findByText('TEST')
        await screen.findByText('142.45$')
    })
})
