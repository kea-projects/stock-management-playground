import { useGetStocksSymbols } from '../../api/hooks/useStock'
import { Box, Spinner, VStack } from '@chakra-ui/react'
import { StockBar } from '../stock-bar/StockBar'

interface StockListProps {
    setSelectedStock: (stockTicker: string) => void
}

export function StockList({ setSelectedStock }: StockListProps) {
    const { data, isLoading } = useGetStocksSymbols()
    return (
        <VStack height="100%" bg="contentBoxColor" px={10}>
            {isLoading ? (
                <Spinner />
            ) : (
                <VStack justifyContent="normal">
                    {data?.map((stockSymbol) => (
                        <Box
                            onClick={() => setSelectedStock(stockSymbol)}
                            key={stockSymbol}
                        >
                            <StockBar stockTicker={stockSymbol} />
                        </Box>
                    ))}
                </VStack>
            )}
        </VStack>
    )
}
