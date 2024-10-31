import './App.css'
import CsrfRepository from "./repository/CsrfRepository.ts";
import {RecoilRoot} from "recoil";
import {Route, Routes} from 'react-router-dom'
import AuthProvider from "./view/AuthProvider.tsx";
import AuthRepository from "./repository/AuthRepository.ts";
import LoginScreen from "./view/LoginScreen.tsx";
import HomeScreen from "./view/HomeScreen.tsx";

interface AppProps {
    authRepository: AuthRepository
    csrfRepository: CsrfRepository
}

function App(
    {
        authRepository,
        csrfRepository,
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
