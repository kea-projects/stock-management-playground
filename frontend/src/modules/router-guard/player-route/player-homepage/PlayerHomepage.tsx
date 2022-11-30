import { VStack } from '@chakra-ui/react'
import { WalletsStatusCard } from './wallet-status-card/WalletsStatusCard'

export function PlayerHomepage() {
    return (
        <VStack>
            <WalletsStatusCard />
        </VStack>
    )
}
