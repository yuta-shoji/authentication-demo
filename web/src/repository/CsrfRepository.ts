import Http, {NetworkHttp} from "../http/NetworkHttp.ts";

export default interface CsrfRepository {
    getCsrfToken(): Promise<string>
}

export class DefaultCsrfRepository implements CsrfRepository {
    constructor(private http: Http = new NetworkHttp()) {}

    async getCsrfToken(): Promise<string> {
        const url = '/api/csrf'
        return await this.http.get(url)
    }
}