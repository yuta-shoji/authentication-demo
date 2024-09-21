import {atom} from "recoil";
import User from "../model/User.ts";

export enum RecoilState {
    CsrfTokenState = 'csrfTokenState',
    UserIsLoggedInState = 'userIsLoggedInState',
    UserState = 'userState',
}

export const userIsLoggedInState = atom<boolean>({
    key: RecoilState.UserIsLoggedInState,
    default: '',
})

export const csrfTokenState = atom<string | null>({
    key: RecoilState.CsrfTokenState,
    default: null,
})

export const userState = atom<User>({
    key: RecoilState.UserState,
    default: null,
})