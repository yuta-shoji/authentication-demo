import Http from "../../http/Http.ts";

export class DummyHttp implements Http {
    get<T>(url: string, headers?: object): Promise<T> {
        return Promise.resolve({} as T)
    }

    post<T>(url: string, body?: object, headers?: object): Promise<T> {
        return Promise.resolve({} as T)
    }
}

export class SpyHttp implements Http {
    get_argument_url?: string
    get_argument_headers?: object
    get<T>(url: string, headers?: object): Promise<T> {
        this.get_argument_url = url
        this.get_argument_headers = headers
        return Promise.resolve({} as T)
    }

    post_argument_url?: string
    post_argument_body?: object
    post_argument_headers?: object
    post<T>(url: string, body?: object, headers?: object): Promise<T> {
        this.post_argument_url = url
        this.post_argument_body = body
        this.post_argument_headers = headers
        return Promise.resolve({} as T)
    }
}

export class StubHttp implements Http {
    get_returnValue: Promise<any> = Promise.resolve()
    get<T>(url: string, headers?: object): Promise<T> {
        return this.get_returnValue
    }

    post_returnValue: Promise<any> = Promise.resolve()
    post<T>(url: string, body?: object, headers?: object): Promise<T> {
        return this.post_returnValue
    }
}
