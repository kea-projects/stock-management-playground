import { Box } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../../provider/user-provider/UserProvider'
import { Link } from 'react-router-dom'
import { routes } from '../../../routes'

export function LogoutButton() {
    const { setUserDetail } = useContext(UserContext)
    return (
        <Box>
            <Link to={routes.homepage} onClick={() => setUserDetail({})}>
                Log Out
            </Link>
        </Box>
    )
}
