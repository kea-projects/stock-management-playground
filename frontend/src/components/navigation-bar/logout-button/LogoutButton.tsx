import { Text, Box } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../../provider/user-provider/UserProvider'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../routes'
import { useQueryClient } from '@tanstack/react-query'
import { UserKeys } from '../../../api/hooks/useUser'
import { WalletsKeys } from '../../../api/hooks/useWallets'

export function LogoutButton() {
    const queryClient = useQueryClient()
    const navigation = useNavigate()
    const { setUserDetail } = useContext(UserContext)
    const logout = async () => {
        await queryClient.invalidateQueries([
            UserKeys.userMeKey,
            WalletsKeys.singleWalletMe,
            WalletsKeys.allWalletsMe,
        ])
        setUserDetail({})
        navigation(routes.homepage)
        navigation(0)
    }
    return (
        <Box onClick={() => logout()} cursor="pointer">
            <Text>Log Out</Text>
        </Box>
    )
}
