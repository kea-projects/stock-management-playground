import { useForm } from 'react-hook-form'
import { SignUpFormValues } from '../SignUp'
import {
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    HStack,
    Input,
    Link,
    VStack,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { routes } from '../../../routes'
import { emailValidation } from '../../../util/emailValidation'

interface SignUpFormProps {
    isLoading: boolean
    apiError: string
    onSubmit: (signUpFormValues: SignUpFormValues) => void
}

export function SignUpForm({ isLoading, apiError, onSubmit }: SignUpFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormValues>()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={3}>
                <FormControl isInvalid={!!errors.fullName}>
                    <Input
                        {...register('fullName', {
                            required: 'This field is required',
                        })}
                        placeholder="Full name"
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                    <Input
                        {...register('email', {
                            required: 'This field is required',
                            pattern: {
                                value: emailValidation,
                                message: 'Please fill a valid email',
                            },
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
                            validate: (value) => {
                                if (watch('confirmPassword') !== value)
                                    return 'Your two passwords do not match'
                            },
                        })}
                        placeholder="Password"
                        type="password"
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.confirmPassword}>
                    <Input
                        {...register('confirmPassword', {
                            required: 'This field is required',
                            validate: (value) => {
                                if (watch('password') !== value)
                                    return 'Your two passwords do not match'
                            },
                        })}
                        placeholder="Confirm password"
                        type="password"
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!apiError} maxWidth={'60%'}>
                    <FormErrorMessage>{apiError}</FormErrorMessage>
                </FormControl>
                <HStack>
                    {' '}
                    <FormControl isInvalid={!!errors.acceptTerms}>
                        <Checkbox
                            {...register('acceptTerms', {
                                validate: (value) => {
                                    if (!value)
                                        return 'Please confirm that you read the term of use and the privacy policy'
                                },
                            })}
                        >
                            <span>I accept the </span>
                            <Link as={RouterLink} to={routes.termOfUse}>
                                Term of Use
                            </Link>
                            {'  '}&{'  '}
                            <Link as={RouterLink} to={routes.privacyPolicy}>
                                Privacy Policy
                            </Link>
                        </Checkbox>
                        <FormErrorMessage>
                            {errors.acceptTerms?.message}
                        </FormErrorMessage>
                    </FormControl>
                </HStack>
                <Button
                    type="submit"
                    width="100%"
                    variant="signInButton"
                    isLoading={isLoading}
                >
                    Sign up
                </Button>
            </VStack>
        </form>
    )
}
