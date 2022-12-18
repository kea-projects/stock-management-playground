import { render } from '../../../../../test-utils/test-utils'
import { AddNewStockEntry } from './AddNewStockEntry'
import { screen } from "@testing-library/react";

describe('checks add new stock entry', () => {
    test('checks if input field is being showm', () => {
        render(<AddNewStockEntry onSuccess={()=> null}/>)
        screen.getByPlaceholderText('Stock Ticker')
        screen.getByRole('button', { name: /Add Stock/i })
    })
})