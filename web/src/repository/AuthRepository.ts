import User from "../model/User.ts";
import Http, {NetworkHttp} from "../http/Http.ts";

export default interface AuthRepository {
    getUser(): Promise<User>
}

export class DefaultAuthRepository implements AuthRepository {
    constructor(private http: Http = new NetworkHttp()) {}

    async getUser(): Promise<User> {
        const url = '/auth/api/users/me'
        return await this.http.get(url)
    }
}