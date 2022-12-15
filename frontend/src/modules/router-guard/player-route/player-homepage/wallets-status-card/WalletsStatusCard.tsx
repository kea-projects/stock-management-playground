import {
    Text,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    HStack,
} from '@chakra-ui/react'
import { DetailsBox } from '../../../../../components/details-box/DetailsBox'
import { Wallet } from '../../../../../api/client'

interface WalletsStatusCardProps {
    wallets: Wallet[]
}

export function WalletsStatusCard({ wallets }: WalletsStatusCardProps) {
    return (
        <DetailsBox>
            <HStack minWidth={300} minHeight={150} flexGrow={1}>
                <Stat>
                    <StatLabel fontSize="large">Wallets Overview</StatLabel>
                    <StatHelpText>Your available cash</StatHelpText>{' '}
                    <StatNumber fontSize="large">
                        <HStack>
                            <Text>
                                $
                                {wallets.reduce(
                                    (prevValue, currentValue) =>
                                        prevValue +
                                        (currentValue.balance
                                            ? currentValue.balance
                                            : 0),
                                    0
                                )}
                            </Text>
                        </HStack>
                    </StatNumber>
                </Stat>
            </HStack>
        </DetailsBox>
    )
}