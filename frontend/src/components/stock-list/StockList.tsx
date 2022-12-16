import { useGetStocksSymbols } from '../../api/hooks/useStock'
import { Flex, Skeleton, VStack } from '@chakra-ui/react'
import { StockBar } from '../stock-bar/StockBar'

interface StockListProps {
    setSelectedStock: (stockTicker: string) => void
}

export function StockList({ setSelectedStock }: StockListProps) {
    const { data, isLoading } = useGetStocksSymbols()
    return (
        <Skeleton isLoaded={!isLoading} h="100%">
            <VStack
                justifyContent="flex-start"
                height="100%"
                bg="contentBoxColor"
                py={3}
                px={3}
            >
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
    )
}
