import { Box } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../../provider/user-provider/UserProvider'
import { Link } from 'react-router-dom'
import { routes } from '../../../routes'
import { useQueryClient } from '@tanstack/react-query'
import { UserKeys } from "../../../api/hooks/useUser";
import { WalletsKeys } from "../../../api/hooks/useWallets";

export function LogoutButton() {
    const queryClient = useQueryClient
    const { setUserDetail } = useContext(UserContext)
    const logout =async () => {
      await queryClient().invalidateQueries([UserKeys.userMeKey, WalletsKeys.singleWalletMe, WalletsKeys.allWalletsMe])
      setUserDetail({})
    }
    return (
        <Box>
            <Link to={routes.homepage} onClick={() => logout()}>
                Log Out
            </Link>
        </Box>
    )
}
