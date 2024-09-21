import './App.css'
import {DefaultCsrfRepository} from "./repository/CsrfRepository.ts";
import {RecoilRoot} from "recoil";
import Authorized from "./view/auth/Authorized.tsx";
import UserProvider from "./view/auth/UserProvider.tsx";
import {DefaultAuthRepository} from "./repository/AuthRepository.ts";
import Unauthorized from "./view/auth/Unauthorized.tsx";
import LoginScreen from "./view/auth/LoginScreen.tsx";
import HomeScreen from "./view/HomeScreen.tsx";


function App() {
    const authRepository = new DefaultAuthRepository()
    const csrfRepository = new DefaultCsrfRepository()

    return (
        <>
            <RecoilRoot>
                <UserProvider
                    authRepository={authRepository}
                    csrfRepository={csrfRepository}
                >
                    <Authorized>
                        <HomeScreen/>
                    </Authorized>

                    <Unauthorized>
                        <LoginScreen/>
                    </Unauthorized>
                </UserProvider>
            </RecoilRoot>
        </>
    )
}

export default App
