import { UserContext, UserDetail, UserProvider } from './UserProvider'
import { useContext } from 'react'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils/test-utils'

describe('test provider', () => {
    test('check if the provider can get a user detail and pass it to the children component', () => {
        const userDetail: UserDetail = {
            tokenType: 'admin',
            token: 'test token',
        }
        const DummyComponent = () => {
            const { userDetail: user } = useContext(UserContext)
            return (
                <>
                    <div>{user.tokenType}</div>
                    <div>{user.token}</div>
                </>
            )
        }
        render(
            <UserProvider value={userDetail}>
                <DummyComponent />
            </UserProvider>
        )
        screen.getByText('admin')
        screen.getByText('test token')
    })
})
