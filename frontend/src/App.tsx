import { BrowserRouter } from 'react-router-dom'
import { RouterGuard } from './modules/router-guard/RouterGuard'
import { useContext } from 'react'
import {
    UserContext,
    UserProvider,
} from './provider/user-provider/UserProvider'

function App() {
    const { userDetail } = useContext(UserContext)
    console.log(userDetail)
    return (
        <UserProvider value={userDetail}>
            <BrowserRouter>
                <RouterGuard />
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
