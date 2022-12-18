import { AxiosPlayer } from '../../../components/axios-player/AxiosPlayer'
import { TopNavigationBar } from '../../../components/navigation-bar/top-navigation-bar/TopNavigationBar'
import { useGetUserMe } from '../../../api/hooks/useUser'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../../../routes'
import { HStack, VStack, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../../provider/user-provider/UserProvider'
import { SideNavigationBar } from '../../../components/navigation-bar/side-navigation-bar/SideNavigationBar'
import { PlayerHomepage } from '../../player-homepage/PlayerHomepage'
import { Wallets } from '../../wallets/wallets'

export function PlayerRoute() {
    const { data, error } = useGetUserMe()
    const { setUserDetail } = useContext(UserContext)
    if (error) {
        setUserDetail({})
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
                        <Route
                            path={routes.transactions}
                            element={<Text>Transactions page</Text>}
                        />
                        <Route
                            path={routes.portfolio}
                            element={<Text>Portfolio page</Text>}
                        />
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
