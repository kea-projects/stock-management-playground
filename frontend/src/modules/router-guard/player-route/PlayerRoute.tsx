import { AxiosPlayer } from '../../../components/axios-player/AxiosPlayer'
import { Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../../provider/user-provider/UserProvider'

export function PlayerRoute() {
    const { setUserDetail } = useContext(UserContext)
    return (
        <AxiosPlayer>
            <h1>Player route</h1>
            <Button onClick={() => setUserDetail({})} variant="signInButton">
                logout
            </Button>
        </AxiosPlayer>
    )
}
