import { rest } from 'msw'

const authLogin = rest.post(
    `http://localhost/auth/login`,
    async (req, res, context) => {
        const requestContent = await req.text()
        if (
            requestContent ===
            'username=correctCredential%40email.com&password=correctPassword'
        )
            return res(
                context.json({
                    access_token: 'abcd12345678',
                    token_type: 'Bearer',
                })
            )
        else return res(context.status(401))
    }
)

const authSignUp = rest.post(
    `http://localhost/auth/signup`,
    (_req, res, context) => {
        return res(context.status(201))
    }
)

export const authHandler = [authLogin, authSignUp]
