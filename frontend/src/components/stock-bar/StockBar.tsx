import { useGetStock } from '../../api/hooks/useStock'
import { VStack } from '@chakra-ui/react'
import { StockBarItem } from './stock-bar-item/StockBarItem'

interface StockGraphProps {
    stockTicker: string
    onClick: (stockTicker: string) => void
}

export function StockBar({ stockTicker, onClick }: StockGraphProps) {
    const { data } = useGetStock({ stockTicker })
    return (
        <VStack onClick={() => onClick(stockTicker)} width="100%">
            {data ? <StockBarItem stock={data}></StockBarItem> : null}
        </VStack>
    )
}
