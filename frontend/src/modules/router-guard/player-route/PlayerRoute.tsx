import { AxiosPlayer } from '../../../components/axios-player/AxiosPlayer'
import { TopNavigationBar } from '../../../components/navigation-bar/top-navigation-bar/TopNavigationBar'
import { useGetUserMe, UserKeys } from '../../../api/hooks/useUser'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { routes } from '../../../routes'
import { HStack, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../../provider/user-provider/UserProvider'
import { SideNavigationBar } from '../../../components/navigation-bar/side-navigation-bar/SideNavigationBar'
import { PlayerHomepage } from '../../player-homepage/PlayerHomepage'
import { Wallets } from '../../wallets/wallets'
import { WalletsKeys } from '../../../api/hooks/useWallets'
import { useQueryClient } from '@tanstack/react-query'

export function PlayerRoute() {
    const { data, error } = useGetUserMe()
    const queryClient = useQueryClient()
    const { setUserDetail } = useContext(UserContext)
    const navigation = useNavigate()
    if (error) {
        setUserDetail({})
        queryClient.invalidateQueries([
            UserKeys.userMeKey,
            WalletsKeys.singleWalletMe,
            WalletsKeys.allWalletsMe,
        ])
        navigation(0)
        return null
    }
    return (
        <AxiosPlayer>
            <HStack
                justifyContent="space-between"
                w="100%"
                h="100vh"
                alignItems="stretch"
            >
                <SideNavigationBar />
                <VStack width="100%">
                    <TopNavigationBar fullName={data?.full_name} />
                    <Routes>
                        <Route
                            path={routes.homepage}
                            element={<PlayerHomepage />}
                        />
                        <Route path={`${routes.wallets}`} element={<Wallets />}>
                            <Route path={`:walletId`} element={<Wallets />} />
                        </Route>
                        {/*<Route*/}
                        {/*    path={routes.transactions}*/}
                        {/*    element={<Text>Transactions page</Text>}*/}
                        {/*/>*/}
                        {/*<Route*/}
                        {/*    path={routes.portfolio}*/}
                        {/*    element={<Text>Portfolio page</Text>}*/}
                        {/*/>*/}
                        <Route
                            path={routes.any}
                            element={<Navigate to={routes.homepage} replace />}
                        />
                    </Routes>
                </VStack>
            </HStack>
        </AxiosPlayer>
    )
}
