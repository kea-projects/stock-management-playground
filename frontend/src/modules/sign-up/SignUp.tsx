import { HStack, Text, VStack } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { SignUpForm } from './sign-up-form/SignUpForm'
import { useSignUp } from '../../api/hooks/useAuth'
import { useState } from 'react'

export interface SignUpFormValues {
    fullName: string
    password: string
    confirmPassword: string
    email: string
    acceptTerms: boolean
}

interface SignUpProps {
    onSuccess: () => void
}

export function SignUp({ onSuccess }: SignUpProps) {
    const { mutate, isLoading } = useSignUp()
    const [apiError, setApiError] = useState('')
    const onSubmit: SubmitHandler<SignUpFormValues> = (
        signUpFormValues: SignUpFormValues
    ) => {
        mutate(signUpFormValues, {
            onSuccess: () => onSuccess(),
            onError: () => {
                setApiError(
                    'Looks like you entered bad information, please try again'
                )
            },
        })
    }
    return (
        <HStack h="100vh">
            <VStack
                bg="layerBackgroundColor"
                w={['700px', '700px', '100%']}
                justifyContent="space-around"
                h={['100%', 'initial', 'initial']}
                p={10}
                gap={5}
                borderRadius={10}
            >
                <Text fontSize="5xl">Fill your profile</Text>
                <SignUpForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    apiError={apiError}
                />
            </VStack>
        </HStack>
    )
}
