import { render } from '../../test-utils/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { StockList } from './StockList'

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
        const stockBarElement = await screen.findByText('AAPL')
        fireEvent.click(stockBarElement)
        expect(mockClickEvent.mock.calls[0][0]).toBe('AAPL')
    })
})
