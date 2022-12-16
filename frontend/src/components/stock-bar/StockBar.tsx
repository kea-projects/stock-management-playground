import { useGetStock } from '../../api/hooks/useStock'
import {
    HStack,
    Spinner,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    Text,
    Image,
    Skeleton,
} from '@chakra-ui/react'

interface StockGraphProps {
    stockTicker: string
}

export function StockBar({ stockTicker }: StockGraphProps) {
    const { data, isLoading } = useGetStock({ stockTicker })
    return (
        <Skeleton isLoaded={!isLoading}>
            <HStack justifyContent="space-between">
                <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={data?.logo}
                    alt={stockTicker}
                />
                <Stat>
                    <StatLabel fontSize="large">
                        <HStack>
                            <Text>{stockTicker} </Text>
                            <Text fontSize="sm">
                                {data?.current_price?.toFixed(2)}
                            </Text>
                            <Text fontSize="sm">$</Text>
                        </HStack>
                    </StatLabel>
                    {data ? (
                        <>
                            <StatHelpText>
                                <HStack>
                                    <StatArrow
                                        type={
                                            data.percentage_change!! > 0
                                                ? 'increase'
                                                : 'decrease'
                                        }
                                    />
                                    <Text>
                                        {data.percentage_change?.toFixed(2)}
                                    </Text>{' '}
                                    <>%</>
                                </HStack>
                            </StatHelpText>
                        </>
                    ) : (
                        <Spinner />
                    )}
                </Stat>
            </HStack>
        </Skeleton>
    )
}
