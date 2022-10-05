import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { routes } from '../../../routes'
import { Homepage } from '../home-page/Homepage'
import { SignUp } from '../../sign-up/SignUp'

export function GuestRouter() {
    const navigation = useNavigate()
    const signUpSuccess = () => {
        navigation(routes.homepage)
    }
    return (
        <Routes>
            <Route path={routes.homepage} element={<Homepage />} />
            <Route
                path={routes.signUp}
                element={<SignUp onSuccess={signUpSuccess} />}
            />
            <Route
                path={routes.any}
                element={<Navigate to={routes.homepage} replace />}
            />
        </Routes>
    )
}
