import { useGetSingleWallet } from '../../../api/hooks/useWallets'
import { DetailsBox } from '../../../components/details-box/DetailsBox'
import {
    Box,
    HStack,
    Spinner,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
} from '@chakra-ui/react'
import React from 'react'

interface SingleWalletStatusCardProps {
    walletId: string
    onClick: () => void
}

export function SingleWalletStatusCard({
    walletId,
    onClick,
}: SingleWalletStatusCardProps) {
    const { data, isLoading } = useGetSingleWallet(walletId)
    return (
        <Box onClick={() => onClick()} cursor="pointer">
            <DetailsBox>
                <HStack minWidth={300} minHeight={150} flexGrow={1}>
                    <Stat>
                        <StatLabel fontSize="large">
                            <HStack>
                                Wallet nickname: <Text>{data?.nickname}</Text>
                            </HStack>
                        </StatLabel>
                        <StatHelpText>Your available cash</StatHelpText>
                        <StatNumber fontSize="large">
                            {isLoading ? (
                                <Spinner />
                            ) : (
                                <HStack>
                                    <Text>${data?.balance?.toFixed(2)}</Text>
                                </HStack>
                            )}
                        </StatNumber>
                    </Stat>
                </HStack>
            </DetailsBox>
        </Box>
    )
}
