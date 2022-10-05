import { useMutation } from '@tanstack/react-query'
import { LoginInputValues } from '../../modules/login/Login'
import { useState } from 'react'
import { BaseConfig } from '../client-config/baseConfig'
import { AuthApi } from '../client'
import { SignUpFormValues } from '../../modules/sign-up/SignUp'

/*
If we will autogenerate the client api from the swagger docs we will probably need this line, we will keep it for now*/

const useClient = () => {
    const [loginApi] = useState(
        () => new AuthApi(BaseConfig, BaseConfig.basePath)
    )
    return loginApi
}

export const useLogin = () => {
    const client = useClient()
    return useMutation((signInDetails: LoginInputValues) => {
        return client
            .loginAuthLoginPost(signInDetails.email, signInDetails.password)
            .then((response) => {
                return response
            })
    })
}

export const useSignUp = () => {
    const client = useClient()
    return useMutation((signUp: SignUpFormValues) =>
        client.signupAuthSignupPost({
            full_name: signUp.fullName,
            password: signUp.password,
            username: signUp.email,
        })
    )
}
