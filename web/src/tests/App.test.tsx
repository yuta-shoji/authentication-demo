import {describe, expect, test, vitest} from "vitest";
import App from "../App.tsx";
import {renderApplicationInMemoryRouter} from "./helper/renderApplication.tsx";
import AuthProvider from "../view/auth/AuthProvider.tsx";
import {DummyAuthRepository} from "./repository/doubles/AuthRepositoryDoubles.ts";
import {DummyCsrfRepository} from "./repository/doubles/CsrfRepositoryDoubles.ts";
import HomeScreen from "../view/HomeScreen.tsx";
import LoginScreen from "../view/auth/LoginScreen.tsx";

vitest.mock('../view/HomeScreen.tsx')
vitest.mock('../view/auth/LoginScreen.tsx')
vitest.mock('../view/auth/AuthProvider.tsx')

describe('App', () => {
    test('["/"] にアクセスした時、AuthProviderに正しいrepositoryを渡して描画する', async () => {
        const authRepository = new DummyAuthRepository()
        const csrfRepository = new DummyCsrfRepository()
        await renderApp(
            '/',
            {
                authRepository: authRepository,
                csrfRepository: csrfRepository
            }
        )

        expect(AuthProvider)
            .toHaveBeenCalledWith(
                {authRepository, csrfRepository},
                {}
            )
    })

    test('["/home"] にアクセスした時、HomeScreenを正しく描画する', async () => {
        await renderApp('/home')

        expect(HomeScreen).toHaveBeenCalled()
    })

    test('["/login"] にアクセスした時、HomeScreenを正しく描画する', async () => {
        await renderApp('/login')

        expect(LoginScreen).toHaveBeenCalled()
    })
})

async function renderApp(
    path: string = '/',
    props: Partial<Parameters<typeof App>[0]> = {
        authRepository: new DummyAuthRepository(),
        csrfRepository: new DummyCsrfRepository(),
    },
) {
    return await renderApplicationInMemoryRouter(
        <App
            authRepository={props.authRepository!}
            csrfRepository={props.csrfRepository!}
        />,
        path,
    )
}