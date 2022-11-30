import { useContext } from 'react'
import { UserContext } from '../../provider/user-provider/UserProvider'
import { PlayerRoute } from './player-route/PlayerRoute'
import { GuestRouter } from './guest-router/GuestRouter'

export function RouterGuard() {
    const { userDetail } = useContext(UserContext)
    if (userDetail.token) {
        return <PlayerRoute />
    } else {
        return <GuestRouter />
    }
}
