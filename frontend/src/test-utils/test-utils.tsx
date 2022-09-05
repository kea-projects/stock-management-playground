import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <QueryClientProvider
                    client={
                        new QueryClient({
                            logger: {
                                log: (log) => console.log(log),
                                warn: (warring) => console.log(warring),
                                error: () => {
                                    return
                                },
                            },
                            defaultOptions: {
                                queries: {
                                    retry: 2,
                                    retryDelay: 100,
                                },
                            },
                        })
                    }
                >
                    {children}
                </QueryClientProvider>
            </BrowserRouter>
        </ChakraProvider>
    )
}

const renderWithReactQuery = (ui: ReactElement) => {
    const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
        const queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false } },
            logger: {
                log: (log) => console.log(log),
                warn: (warring) => console.log(warring),
                error: () => {
                    return
                },
            },
        })

        return (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )
    }
    return render(<Wrapper>{ui}</Wrapper>)
}
/*
//Flexible render option if need to test with user context
const renderWithUseContextUser = (
    ui: ReactElement,
    userDetail: UserDetail = {}
) => {
    const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
        return (
            <UserProvider value={userDetail}>
                <>{children}</>
            </UserProvider>
        )
    }
    return customRender(<Wrapper>{ui}</Wrapper>)
}
*/

const RouterProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>
}
const renderWithRouter = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: RouterProvider, ...options })

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

const renderWithPresetUrl = (
    ui: ReactElement,
    url: string,
    queryParam: string
) => {
    const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
        return (
            <QueryClientProvider
                client={
                    new QueryClient({
                        logger: {
                            log: (log) => console.log(log),
                            warn: (warring) => console.log(warring),
                            error: () => {
                                return
                            },
                        },
                    })
                }
            >
                <MemoryRouter initialEntries={[url]}>
                    <Routes>
                        <Route path={queryParam} element={children}></Route>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        )
    }
    return render(<Wrapper>{ui}</Wrapper>)
}

export {
    customRender as render,
    renderWithRouter,
    /*
    renderWithUseContextUser,
    */
    renderWithReactQuery,
    renderWithPresetUrl,
}
