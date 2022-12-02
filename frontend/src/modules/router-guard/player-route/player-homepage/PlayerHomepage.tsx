import { VStack } from '@chakra-ui/react'
import { WalletsStatusCard } from './wallet-status-card/WalletsStatusCard'
import { StockGraph } from '../../../../components/stock-graph/StockGraph'

export function PlayerHomepage() {
    return (
        <VStack>
            <WalletsStatusCard />
            <StockGraph />
        </VStack>
    )
}
