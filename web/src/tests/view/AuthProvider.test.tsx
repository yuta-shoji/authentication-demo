import {describe, test, vi} from "vitest";
import {screen} from '@testing-library/react'
import {
    DummyAuthRepository,
    SpyAuthRepository,
    StubAuthRepository
} from "../repository/doubles/AuthRepositoryDoubles.ts";
import {renderApplicationInMemoryRouter} from "../helper/renderApplication.tsx";
import AuthProvider from "../../view/AuthProvider.tsx";
import {
    DummyCsrfRepository,
    SpyCsrfRepository,
    StubCsrfRepository
} from "../repository/doubles/CsrfRepositoryDoubles.ts";
import {RecoilObserver, RecoilObserverProps} from "../recoil/RecoilObserver.ts";
import {RecoilRoot} from "recoil";
import UserBuilder from "../model/UserBuilder.ts";
import {csrfTokenState, userIsLoggedInState, userState} from "../../recoil/RecoilState.ts";
import * as router from 'react-router'
import {PartialProps} from "../helper/PartialProps.ts";

describe('AuthProvider', () => {
    describe('初期レンダリング時', () => {
        test('ローディング中であることを表示する', async () => {
            await renderAuthProvider()

            expect(screen.getByText('Now loading...')).toBeInTheDocument()
        })

        test('authRepository.getUserを呼ぶ', async () => {
            const spyAuthRepository = new SpyAuthRepository()

            await renderAuthProvider({authRepository: spyAuthRepository})

            expect(spyAuthRepository.getUser_wasCalled).toBeTruthy()
        })

        describe('authRepository.getUserのレスポンスがresolveの場合', () => {
            test('user情報をrecoilStateに保存する', async () => {
                const stubAuthRepository = new StubAuthRepository()
                const expectedUser = UserBuilder.build({email: 'expected@example.com'})
                stubAuthRepository.getUser_returnValue = Promise.resolve(expectedUser)

                const spySetUser = vi.fn()
                await renderAuthProvider(
                    {authRepository: stubAuthRepository},
                    {node: userState, onChange: spySetUser}
                )

                expect(spySetUser).toHaveBeenCalledWith(expectedUser)
            })

            test('ログインされたことをrecoilStateに保存する', async () => {
                const stubAuthRepository = new StubAuthRepository()

                const spySetUserIsLoggedIn = vi.fn()
                await renderAuthProvider(
                    {authRepository: stubAuthRepository},
                    {node: userIsLoggedInState, onChange: spySetUserIsLoggedIn}
                )

                expect(spySetUserIsLoggedIn).toHaveBeenCalledWith(true)
            })

            test('["/home"] に遷移する', async () => {
                const resolvedStubAuthRepository = new StubAuthRepository()
                const spyNavigate = vi.fn()
                vi.spyOn(router, 'useNavigate').mockImplementation(() => spyNavigate)

                await renderAuthProvider({authRepository: resolvedStubAuthRepository})

                expect(spyNavigate).toHaveBeenCalledWith('/home')
            })

            test('csrfRepository.getCsrfTokenを呼ぶ', async () => {
                const resolvedStubAuthRepository = new StubAuthRepository()
                const spyCsrfRepository = new SpyCsrfRepository()

                await renderAuthProvider({
                    authRepository: resolvedStubAuthRepository,
                    csrfRepository: spyCsrfRepository,
                })

                expect(spyCsrfRepository.getCsrfToken_wasCalled).toBeTruthy()
            })

            test('csrfRepository.getCsrfTokenが返すCsrfTokenをrecoilStateに保存する', async () => {
                const resolvedStubAuthRepository = new StubAuthRepository()
                const stubCsrfRepository = new StubCsrfRepository()
                const expectedCsrfToken = 'expected csrf token'
                stubCsrfRepository.getCsrfToken_returnValue = Promise.resolve(expectedCsrfToken)

                const spySetCsrfToken = vi.fn()
                await renderAuthProvider(
                    {
                        authRepository: resolvedStubAuthRepository,
                        csrfRepository: stubCsrfRepository,
                    },
                    {node: csrfTokenState, onChange: spySetCsrfToken}
                )

                expect(spySetCsrfToken).toHaveBeenCalledWith(expectedCsrfToken)
            })
        })

        describe('authRepository.getUserのレスポンスがrejectの場合', () => {
            test('csrfRepository.getCsrfTokenを呼ばない', async () => {
                const stubAuthRepository = new StubAuthRepository()
                stubAuthRepository.getUser_returnValue = Promise.reject('bad request')
                const spyCsrfRepository = new SpyCsrfRepository()

                await renderAuthProvider({
                    authRepository: stubAuthRepository,
                    csrfRepository: spyCsrfRepository,
                })

                expect(spyCsrfRepository.getCsrfToken_wasCalled).toBeFalsy()
            })

            test('ログインに失敗したことをrecoilStateに保存する', async () => {
                const stubAuthRepository = new StubAuthRepository()
                stubAuthRepository.getUser_returnValue = Promise.reject('login failed')

                const spySetUserIsLoggedIn = vi.fn()
                await renderAuthProvider(
                    {authRepository: stubAuthRepository},
                    {node: userIsLoggedInState, onChange: spySetUserIsLoggedIn}
                )

                expect(spySetUserIsLoggedIn).toHaveBeenCalledWith(false)
            })

            test('["/login"] に遷移する', async () => {
                const stubAuthRepository = new StubAuthRepository()
                stubAuthRepository.getUser_returnValue = Promise.reject('login failed')
                const spyNavigate = vi.fn()
                vi.spyOn(router, 'useNavigate').mockImplementation(() => spyNavigate)

                await renderAuthProvider({authRepository: stubAuthRepository})

                expect(spyNavigate).toHaveBeenCalledWith('/login')
            })
        })
    })
})

async function renderAuthProvider<T, >(
    partialProps?: PartialProps<AuthProvider>,
    recoilState?: RecoilObserverProps<T>
) {
    const props = {
        authRepository: new DummyAuthRepository(),
        csrfRepository: new DummyCsrfRepository(),
        ...partialProps,
    }
    await renderApplicationInMemoryRouter(
        <RecoilRoot>
            {recoilState &&
                <RecoilObserver node={recoilState.node} onChange={recoilState.onChange}/>
            }
            <AuthProvider {...props}/>
        </RecoilRoot>,
        '/'
    )
}