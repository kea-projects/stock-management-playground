import { HStack, Spinner, VStack } from '@chakra-ui/react'
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
        <HStack
            w="100%"
            alignItems="flex-start"
            px={10}
            justifyContent={'space-between'}
            flexGrow={1}
        >
            <VStack height="100%" width="100%">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <VStack
                        alignItems="flex-start"
                        h="100%"
                        justifyContent="space-around"
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
                    </VStack>
                )}
                {selectedStock ? (
                    <VStack bg="contentBoxColor" w="100%">
                        <ViewStock stockTicker={selectedStock} />
                    </VStack>
                ) : null}
            </VStack>
            <StockList setSelectedStock={setSelectedStock} />
        </HStack>
    )
}
