import Http, {NetworkHttp} from "../http/Http.ts";
import {GetUserResponse} from "../model/response/GetUserResponse.ts";
import {CreateCognitoUserResponse} from "../model/response/CreateCognitoUserResponse.ts";

export default interface AuthRepository {
    getUser(): Promise<GetUserResponse>
    createEmployeeUser(email: string): Promise<CreateCognitoUserResponse>
}

export class DefaultAuthRepository implements AuthRepository {
    constructor(private http: Http = new NetworkHttp()) {}

    async getUser(): Promise<GetUserResponse> {
        const url = '/api/users/me'
        return await this.http.get(url)
    }

    async createEmployeeUser(email: string): Promise<CreateCognitoUserResponse> {
        const url = '/api/auth/cognito/create-user/employee'
        const body = {email: email}
        const header = {'Content-Type': 'application/json'}
        return await this.http.post(url, body, header)
    }
}