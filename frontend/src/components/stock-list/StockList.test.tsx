import { render } from '../../test-utils/test-utils'
import { screen } from '@testing-library/react'
import { StockList } from './StockList'
import userEvent from '@testing-library/user-event'

describe('checks stock list', () => {
    test('checks that all stocks are being shown', async () => {
        render(<StockList setSelectedStock={() => null} />)
        await screen.findByText('AAPL')
        await screen.findByText('TEST')
        await screen.findByText('TSLA')
        await screen.findByText('GOOGL')
        await screen.findByText('MSFT')
    })
    test('checks that stock list react for click with the right stock value', async () => {
        const mockClickEvent = jest.fn()
        render(<StockList setSelectedStock={mockClickEvent} />)
        userEvent.click(await screen.findByText('TEST'))
        expect(mockClickEvent.mock.calls[0][0]).toBe('TEST')
    })
})
