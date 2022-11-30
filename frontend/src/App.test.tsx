import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React from 'react'
import App from './App'
import { theme } from './theme'

test('renders  app', () => {
    render(
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={new QueryClient()}>
                <App />
            </QueryClientProvider>
        </ChakraProvider>
    )
})
