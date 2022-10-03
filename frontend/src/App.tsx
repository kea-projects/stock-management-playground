import { BrowserRouter } from 'react-router-dom'
import { VStack } from '@chakra-ui/react'
import { RouterGuard } from './modules/router-guard/RouterGuard'

function App() {
    return (
        <BrowserRouter>
            <VStack>
                <RouterGuard />
            </VStack>
        </BrowserRouter>
    )
}

export default App
