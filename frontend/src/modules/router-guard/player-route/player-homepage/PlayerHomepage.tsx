import { HStack, SimpleGrid, Skeleton, VStack } from '@chakra-ui/react'
import { StockList } from '../../../../components/stock-list/StockList'
import { useState } from 'react'
import { ViewStock } from '../../../../components/view-stock/ViewStock'
import { WalletsStatusCard } from './wallets-status-card/WalletsStatusCard'
import { useGetAllWalletsMe } from '../../../../api/hooks/useWallets'
import { SingleWalletStatusCard } from './single-wallet-status-card/SingleWalletStatusCard'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../../routes'

export function PlayerHomepage() {
    const [selectedStock, setSelectedStock] = useState<string | undefined>()
    const { data, isLoading } = useGetAllWalletsMe()
    const navigation = useNavigate()
    const navigateWallet = (walletId: string) => {
        navigation(`${routes.wallets}/${walletId}`)
    }
    return (
        <HStack flexGrow={1} justifyContent="space-between" w="100%">
            <VStack height="100%">
                <Skeleton isLoaded={!isLoading} w="100%">
                    <SimpleGrid
                        columns={[1, 2, 3]}
                        spacing={3}
                        alignItems="flex-start"
                        h="100%"
                    >
                        <WalletsStatusCard wallets={data ?? []} />

                        {data
                            ? data.length > 3
                                ? data
                                      .slice(0, 3)
                                      .map((wallet) => (
                                          <SingleWalletStatusCard
                                              walletId={wallet._id + ''}
                                              onClick={() =>
                                                  navigateWallet(
                                                      wallet._id + ''
                                                  )
                                              }
                                              key={wallet._id}
                                          />
                                      ))
                                : data.map((wallet) => (
                                      <SingleWalletStatusCard
                                          walletId={wallet._id + ''}
                                          onClick={() =>
                                              navigateWallet(wallet._id + '')
                                          }
                                          key={wallet._id}
                                      />
                                  ))
                            : null}
                    </SimpleGrid>

                    {selectedStock ? (
                        <VStack bg="contentBoxColor" w="100%">
                            <ViewStock stockTicker={selectedStock} />
                        </VStack>
                    ) : null}
                </Skeleton>
            </VStack>

            <StockList setSelectedStock={setSelectedStock} />
        </HStack>
    )
}
