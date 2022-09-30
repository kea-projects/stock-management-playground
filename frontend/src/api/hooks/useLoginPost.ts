import { useMutation } from '@tanstack/react-query'
import { LoginInputValues } from '../../modules/login/Login'

/*
If we will autogenerate the client api from the swagger docs we will probably need this line, we will keep it for now
const useClient = () => {
const [loginApi] = useState(
() => null
    new AdminSessionControllerApi(
        BaseConfig,
        BaseConfig.basePath,
        AxiosPlayer
    )

    )
    return loginApi
}
*/

interface UserCredentials {
    token: string
    userId: string
}

export const useLoginPost = () => {
    //const client = useClient()
    return useMutation((signInDetails: LoginInputValues) => {
        return fakeLoginPromise(signInDetails).then((response) => {
            return response
        })
    })
}
// until we will use an actual client we can fake a promise
const fakeLoginPromise = (loginInputValues: LoginInputValues) =>
    new Promise<UserCredentials>((resolve, reject) => {
        if (
            loginInputValues.email === 'correctCredential@email.com' &&
            loginInputValues.password === 'correctPassword'
        )
            resolve({ token: 'abcd', userId: 'test user' })
        else reject()
    })
