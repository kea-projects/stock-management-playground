import { useGetStocksSymbols } from '../../api/hooks/useStock'
import { Flex, Skeleton, VStack } from '@chakra-ui/react'
import { StockBar } from '../stock-bar/StockBar'

interface StockListProps {
    setSelectedStock: (stockTicker: string) => void
}

export function StockList({ setSelectedStock }: StockListProps) {
    const { data, isLoading } = useGetStocksSymbols()
    return (
        <VStack height="100%" bg="contentBoxColor" pt={5} px={3}>
            <Skeleton isLoaded={!isLoading}>
                <VStack justifyContent="space-between">
                    {data?.map((stockSymbol) => (
                        <Flex
                            onClick={() => setSelectedStock(stockSymbol)}
                            key={stockSymbol}
                        >
                            <StockBar stockTicker={stockSymbol} />
                        </Flex>
                    ))}
                </VStack>
            </Skeleton>
        </VStack>
    )
}
