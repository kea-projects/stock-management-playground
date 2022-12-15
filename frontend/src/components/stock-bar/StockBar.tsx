import { useGetStock } from '../../api/hooks/useStock'
import {
    HStack,
    Spinner,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    Text,
} from '@chakra-ui/react'

interface StockGraphProps {
    stockTicker: string
}

export function StockBar({ stockTicker }: StockGraphProps) {
    const { data, isLoading } = useGetStock({ stockTicker })
    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
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
            )}
        </>
    )
}
