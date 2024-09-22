import './App.css'
import {DefaultCsrfRepository} from "./repository/CsrfRepository.ts";
import {RecoilRoot} from "recoil";
import {Route, Routes} from 'react-router-dom'
import AuthProvider from "./view/auth/AuthProvider.tsx";
import {DefaultAuthRepository} from "./repository/AuthRepository.ts";
import LoginScreen from "./view/auth/LoginScreen.tsx";
import HomeScreen from "./view/HomeScreen.tsx";


function App() {
    const authRepository = new DefaultAuthRepository()
    const csrfRepository = new DefaultCsrfRepository()

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
