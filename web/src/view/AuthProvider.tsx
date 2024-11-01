import AuthRepository from "../repository/AuthRepository.ts";
import {ReactNode, useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {csrfTokenState, userRoleState, userIsLoggedInState, userState} from "../recoil/RecoilState.ts";
import CsrfRepository from "../repository/CsrfRepository.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    authRepository: AuthRepository
    csrfRepository: CsrfRepository
    children: ReactNode,
}

const AuthProvider = (
    {authRepository, csrfRepository, children}: Props
) => {
    useAuthProvider(authRepository, csrfRepository)

    return children
}

const useAuthProvider = (
    authRepository: AuthRepository,
    csrfRepository: CsrfRepository,
) => {
    const setUser = useSetRecoilState(userState)
    const setCsrfToken = useSetRecoilState(csrfTokenState)
    const setUserRole = useSetRecoilState(userRoleState)
    const setUserIsLoggedIn = useSetRecoilState(userIsLoggedInState)

    const navigate = useNavigate()

    useEffect(() => {
        authRepository.getUser()
            .then(user => {
                setUser({email: user.email})
                setUserRole(user.role)
                setUserIsLoggedIn(true)

                navigate("/home")

                csrfRepository.getCsrfToken()
                    .then(csrfToken => {
                        setCsrfToken(csrfToken)
                    })

            })
            .catch(error => {
                setUserIsLoggedIn(false)
                navigate("/login")
                console.error(error)
            })
    }, [authRepository])
}

export default AuthProvider