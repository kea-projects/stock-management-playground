import { BrowserRouter } from 'react-router-dom'
import { VStack } from '@chakra-ui/react'
import { RouterGuard } from './modules/router-guard/RouterGuard'
import { useContext } from 'react'
import {
    UserContext,
    UserProvider,
} from './provider/user-provider/UserProvider'

function App() {
    const { userDetail } = useContext(UserContext)
    return (
        <UserProvider value={userDetail}>
            <BrowserRouter>
                <VStack>
                    <RouterGuard />
                </VStack>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
