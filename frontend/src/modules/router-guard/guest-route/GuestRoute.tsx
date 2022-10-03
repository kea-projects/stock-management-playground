import { useContext } from 'react'
import {
    UserContext,
    UserDetail,
} from '../../../provider/user-provider/UserProvider'
import { Grid, GridItem, Hide, Show, VStack } from '@chakra-ui/react'
import { Login } from '../../login/Login'
import { WelcomeBox } from './WelcomeBox'

export function GuestRoute() {
    const { setUserDetail } = useContext(UserContext)

    const onSuccess = (credentials: UserDetail) => {
        setUserDetail(credentials)
    }

    return (
        <>
            <Show above="md">
                <Grid
                    templateColumns="repeat(3, 1fr)"
                    width="100%"
                    height="100vh"
                >
                    <GridItem colSpan={2}>
                        <WelcomeBox></WelcomeBox>
                    </GridItem>
                    <GridItem>
                        <Login onSuccess={onSuccess} />
                    </GridItem>
                </Grid>
            </Show>
            <Hide above="md">
                <VStack height="100vh" py="100px">
                    <Login onSuccess={onSuccess} />
                </VStack>
            </Hide>
        </>
    )
}
