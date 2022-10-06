import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../../../routes'
import { Homepage } from '../home-page/Homepage'
import { SignUp } from '../../sign-up/SignUp'

export function GuestRouter() {
    return (
        <Routes>
            <Route path={routes.homepage} element={<Homepage />} />
            <Route path={routes.signUp} element={<SignUp />} />
            <Route
                path={routes.any}
                element={<Navigate to={routes.homepage} replace />}
            />
        </Routes>
    )
}
