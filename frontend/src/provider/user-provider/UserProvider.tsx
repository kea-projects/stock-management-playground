import { createContext } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export interface UserDetail {
    token?: string
    tokenType?: string
}

interface UserProviderProps {
    children: JSX.Element
    value: UserDetail
}

interface UserDetailContext {
    userDetail: UserDetail
    setUserDetail: (userDetail: UserDetail) => void
}

export const UserContext = createContext<UserDetailContext>({
    userDetail: {},
    setUserDetail: () => {
        return
    },
})

export function UserProvider({ children, value }: UserProviderProps) {
    const [userDetail, setUserDetail] = useLocalStorage<UserDetail>(
        'userDetail',
        value
    )

    return (
        <UserContext.Provider value={{ userDetail, setUserDetail }}>
            {children}
        </UserContext.Provider>
    )
}
