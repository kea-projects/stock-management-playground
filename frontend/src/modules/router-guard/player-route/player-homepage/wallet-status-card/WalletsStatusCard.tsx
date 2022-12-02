import {
    Text,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Spinner,
    HStack,
} from '@chakra-ui/react'
import { useGetAllWalletsMe } from '../../../../../api/hooks/useWallets'
import { DetailsBox } from '../../../../../components/details-box/DetailsBox'

export function WalletsStatusCard() {
    const { data, isLoading } = useGetAllWalletsMe()
    return (
        <DetailsBox>
            <Stat>
                <StatLabel fontSize="large">Wallets Overview</StatLabel>
                <StatHelpText>Your available cash</StatHelpText>{' '}
                <StatNumber fontSize="large">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <HStack>
                            <Text>
                                $
                                {data?.reduce(
                                    (prevValue, currentValue) =>
                                        prevValue +
                                        (currentValue.balance
                                            ? currentValue.balance
                                            : 0),
                                    0
                                )}
                            </Text>
                        </HStack>
                    )}
                </StatNumber>
            </Stat>
        </DetailsBox>
    )
}
