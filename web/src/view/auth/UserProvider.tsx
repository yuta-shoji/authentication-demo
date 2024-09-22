import AuthRepository from "../../repository/AuthRepository.ts";
import {ReactElement, useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {csrfTokenState, userIsLoggedInState, userState} from "../../recoil/RecoilState.ts";
import CsrfRepository from "../../repository/CsrfRepository.ts";

interface Props {
    authRepository: AuthRepository
    csrfRepository: CsrfRepository
    children: ReactElement[]
}

const UserProvider = (
    {authRepository, csrfRepository, children}: Props
) => {
    useUserProvider(authRepository, csrfRepository)

    return (
        children
    )
}

const useUserProvider = (
    authRepository: AuthRepository,
    csrfRepository: CsrfRepository,
) => {
    const setUser = useSetRecoilState(userState)
    const setCsrfToken = useSetRecoilState(csrfTokenState)
    const setUserIsLoggedIn = useSetRecoilState(userIsLoggedInState)

    useEffect(() => {
        authRepository.getUser()
            .then(user => {
                setUser(user)
                setUserIsLoggedIn(true)

                csrfRepository.getCsrfToken()
                    .then(csrfToken => {
                        setCsrfToken(csrfToken)
                    })
            })
            .catch(error => {
                setUserIsLoggedIn(false)
                console.error(error)
            })
    }, [authRepository])
}

export default UserProvider