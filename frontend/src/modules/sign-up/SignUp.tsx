import { HStack, Text, VStack } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { SignUpForm } from './sign-up-form/SignUpForm'

export interface SignUpFormValues {
    fullName: string
    password: string
    confirmPassword: string
    email: string
    acceptTerms: boolean
}

export function SignUp() {
    const onSubmit: SubmitHandler<SignUpFormValues> = (
        signUpFormValues: SignUpFormValues
    ) => {
        console.log(signUpFormValues)
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
                <SignUpForm onSubmit={onSubmit} isLoading={false} apiError="" />
            </VStack>
        </HStack>
    )
}
