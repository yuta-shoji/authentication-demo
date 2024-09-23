import {describe} from "vitest";
import renderApplication from "../helper/renderApplication.tsx";
import HomeScreen from "../../view/HomeScreen.tsx";
import {MutableSnapshot, RecoilRoot} from "recoil";
import {userState} from "../../recoil/RecoilState.ts";
import UserBuilder from "../model/UserBuilder.ts";
import {screen} from '@testing-library/react'

describe('HomeScreen', () => {
    describe('初期レンダリング時', () => {
        test('ユーザーのメールアドレスを表示する', async () => {
            const expectedUser = UserBuilder.build({email: 'expected@example.com'})

            await renderHomeScreen(
                ({set}) => set(userState, expectedUser)
            )

            const emailElement = screen.getByLabelText('email')
            expect(emailElement.textContent).toBe(expectedUser.email)
        })
    })
})

async function renderHomeScreen(
    initializeState?: (mutableSnapshot: MutableSnapshot) => void,
) {
    return await renderApplication(
        <RecoilRoot initializeState={initializeState}>
            <HomeScreen/>
        </RecoilRoot>
    )
}