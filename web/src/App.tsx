import './App.css'
import CsrfRepository from "./repository/CsrfRepository.ts";
import {RecoilRoot} from "recoil";
import {Route, Routes} from 'react-router-dom'
import AuthProvider from "./view/AuthProvider.tsx";
import AuthRepository from "./repository/AuthRepository.ts";
import LoginScreen from "./view/LoginScreen.tsx";
import HomeScreen from "./view/HomeScreen.tsx";
import CreateCognitoUser from "./view/CreateCognitoUser.tsx";

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
            <AuthProvider
                authRepository={authRepository}
                csrfRepository={csrfRepository}
            >
                <Routes>
                    <Route path="/">
                        <Route path="home" element={
                            <HomeScreen/>
                        }/>

                        <Route path="login" element={
                            <LoginScreen/>
                        }/>

                        <Route path="create-cognito-user" element={
                            <CreateCognitoUser/>
                        }/>
                    </Route>
                </Routes>
            </AuthProvider>
        </RecoilRoot>
    )
}

export default App
