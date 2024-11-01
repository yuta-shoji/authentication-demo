import Http, {NetworkHttp} from "../http/Http.ts";
import CsrfResponse from "../model/response/CsrfResponse.ts";

export default interface CsrfRepository {
    getCsrfToken(): Promise<string>
}

export class DefaultCsrfRepository implements CsrfRepository {
    constructor(private http: Http = new NetworkHttp()) {}

    async getCsrfToken(): Promise<string> {
        const url = '/api/csrf'
        const data = await this.http.get(url) as CsrfResponse
        return data.token
    }
}