import { useForm } from 'react-hook-form'
import { LoginInputValues } from '../Login'
import {
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    HStack,
    Input,
    VStack,
    Link,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface LoginFormProps {
    onSubmit: (loginFormValues: LoginInputValues) => void
    isLoading?: boolean
    apiError?: string
}

export function LoginForm({
    onSubmit,
    isLoading = false,
    apiError,
}: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputValues>()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={3}>
                <FormControl isInvalid={!!errors.email}>
                    <Input
                        {...register('email', {
                            required: 'This field is required',
                        })}
                        placeholder="Email"
                        type="email"
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                    <Input
                        {...register('password', {
                            required: 'This field is required',
                        })}
                        placeholder="Password"
                        type="password"
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!apiError}>
                    <FormErrorMessage>{apiError}</FormErrorMessage>
                </FormControl>
                <HStack>
                    <Checkbox {...register('rememberMe')}>Remember me</Checkbox>
                    <Link as={RouterLink} to="/reset-password">
                        Reset password
                    </Link>
                </HStack>
                <Button
                    type="submit"
                    width="100%"
                    variant="signInButton"
                    isLoading={isLoading}
                >
                    Sign in
                </Button>
            </VStack>
        </form>
    )
}
