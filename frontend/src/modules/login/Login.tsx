import { Text, HStack, VStack, Link } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { UserDetail } from '../../provider/user-provider/UserProvider'
import { useAuth } from '../../api/hooks/useAuth'
import { LoginForm } from './login-form/LoginForm'
import { Link as RouterLink } from 'react-router-dom'

interface LoginProps {
    onSuccess: (userDetails: UserDetail) => void
}

export interface LoginInputValues {
    email: string
    password: string
    rememberMe: boolean
}

export function Login({ onSuccess }: LoginProps) {
    const { mutate, isLoading } = useAuth()
    const [apiError, setApiError] = useState('')
    const onSubmit: SubmitHandler<LoginInputValues> = (
        input: LoginInputValues
    ) => {
        mutate(
            { ...input },
            {
                onSuccess: (response) => {
                    setApiError('')
                    onSuccess({
                        token: response.data.access_token,
                        tokenType: response.data.token_type,
                    })
                },
                onError: () => {
                    setApiError('Invalid credentials, please try again')
                },
            }
        )
    }

    return (
        <HStack
            bg="layerBackgroundColor"
            w={['500px', '500px', '100%']}
            h="100%"
            justifyContent="space-around"
            p={5}
        >
            <VStack gap={10}>
                <Text fontSize="5xl">Sign in with your password</Text>
                <LoginForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    apiError={apiError}
                />
                <Text>
                    Don't have an account yet?{' '}
                    <Link as={RouterLink} to="/sign-up">
                        Sign up
                    </Link>
                </Text>
            </VStack>
        </HStack>
    )
}
