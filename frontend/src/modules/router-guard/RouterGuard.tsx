import { useContext } from 'react'
import { UserContext } from '../../provider/user-provider/UserProvider'
import { GuestRoute } from './guest-route/GuestRoute'
import { PlayerRoute } from './player-route/PlayerRoute'

export function RouterGuard() {
    const { userDetail } = useContext(UserContext)
    if (userDetail.token) {
        return <PlayerRoute />
    } else {
        return <GuestRoute />
    }
}
