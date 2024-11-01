import {Role} from "../Role.ts";

export interface GetUserResponse {
    email: string
    role: Role
}