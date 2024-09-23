import AuthRepository from "../repository/AuthRepository.ts";
import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {csrfTokenState, userIsLoggedInState, userState} from "../recoil/RecoilState.ts";
import CsrfRepository from "../repository/CsrfRepository.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    authRepository: AuthRepository
    csrfRepository: CsrfRepository
}

const AuthProvider = (
    {authRepository, csrfRepository}: Props
) => {
    useAuthProvider(authRepository, csrfRepository)

    return (
        <>Now loading...</>
    )
}

const useAuthProvider = (
    authRepository: AuthRepository,
    csrfRepository: CsrfRepository,
) => {
    const setUser = useSetRecoilState(userState)
    const setCsrfToken = useSetRecoilState(csrfTokenState)
    const setUserIsLoggedIn = useSetRecoilState(userIsLoggedInState)

    const navigate = useNavigate()

    useEffect(() => {
        authRepository.getUser()
            .then(user => {
                setUser(user)
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