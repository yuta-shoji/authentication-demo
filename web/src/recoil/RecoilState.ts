import {atom} from "recoil";
import {User} from "../model/User.ts";
import {Role} from "../model/Role.ts";

export enum RecoilState {
    CsrfTokenState = 'csrfTokenState',
    UserRoleState = 'userRoleState',
    UserIsLoggedInState = 'userIsLoggedInState',
    UserState = 'userState',
}

export const userIsLoggedInState = atom<boolean>({
    key: RecoilState.UserIsLoggedInState,
    default: false,
})

export const userRoleState = atom<Role | null>({
    key: RecoilState.UserRoleState,
    default: null,
})

export const csrfTokenState = atom<string | null>({
    key: RecoilState.CsrfTokenState,
    default: null,
})

export const userState = atom<User | null>({
    key: RecoilState.UserState,
    default: null,
})