import {
    Text,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Spinner,
} from '@chakra-ui/react'
import { useGetAllWalletsMe } from '../../../../../api/hooks/useWallets'

export function WalletsStatusCard() {
    const { data, isLoading } = useGetAllWalletsMe()
    return (
        <Stat bg={'contentBoxColor'} p={10}>
            <StatLabel fontSize="large">Wallets Overview</StatLabel>
            <StatHelpText>Your available cash</StatHelpText>{' '}
            <StatNumber fontSize="large">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <Text>$</Text>
                        {data?.reduce(
                            (prevValue, currentValue) =>
                                prevValue +
                                (currentValue.balance
                                    ? currentValue.balance
                                    : 0),
                            0
                        )}
                    </>
                )}
            </StatNumber>
        </Stat>
    )
}
