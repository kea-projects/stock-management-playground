import { render } from '../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { StockGraph } from './StockGraph'

describe('checks stock graph visualisation', () => {
    test('checks if x entities and y entities are being shown', () => {
        render(<StockGraph />)
        //Y values
        screen.getByText('10:00')
        screen.getByText('11:00')
        screen.getByText('12:00')
        screen.getByText('13:00')
        screen.getByText('14:00')
        //X values
        screen.getByText('100')
        screen.getByText('120')
        screen.getByText('130')
        screen.getByText('125')
        screen.getByText('90')
    })
})
