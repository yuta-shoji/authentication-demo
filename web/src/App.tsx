import './App.css'
import CsrfRepository, {DefaultCsrfRepository} from "./repository/CsrfRepository.ts";
import {RecoilRoot} from "recoil";
import {Route, Routes} from 'react-router-dom'
import AuthProvider from "./view/auth/AuthProvider.tsx";
import AuthRepository, {DefaultAuthRepository} from "./repository/AuthRepository.ts";
import LoginScreen from "./view/auth/LoginScreen.tsx";
import HomeScreen from "./view/HomeScreen.tsx";

interface AppProps {
    authRepository: AuthRepository
    csrfRepository: CsrfRepository
}

function App(
    {
        authRepository = new DefaultAuthRepository(),
        csrfRepository = new DefaultCsrfRepository(),
    }: AppProps
) {

    return (
        <RecoilRoot>
            <Routes>
                <Route path="/">
                    <Route path="" element={
                        <AuthProvider
                            authRepository={authRepository}
                            csrfRepository={csrfRepository}
                        />
                    }/>

                    <Route path="home" element={
                        <HomeScreen/>
                    }/>

                    <Route path="login" element={
                        <LoginScreen/>
                    }/>
                </Route>
            </Routes>
        </RecoilRoot>
    )
}

export default App
