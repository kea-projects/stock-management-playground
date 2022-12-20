import { BrowserRouter } from 'react-router-dom'
import { RouterGuard } from './modules/router-guard/RouterGuard'
import { useContext } from 'react'
import {
    UserContext,
    UserProvider,
} from './provider/user-provider/UserProvider'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

console.log(process.env.REACT_APP_SENTRY_DSN)
Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
})

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
