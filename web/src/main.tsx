import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {DefaultCsrfRepository} from "./repository/CsrfRepository.ts";
import {DefaultAuthRepository} from "./repository/AuthRepository.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App
                csrfRepository={new DefaultCsrfRepository()}
                authRepository={new DefaultAuthRepository()}
            />
        </BrowserRouter>
    </StrictMode>
)
