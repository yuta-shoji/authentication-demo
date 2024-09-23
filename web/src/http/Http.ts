import axios from 'axios'

export default interface Http {
    get<T>(url: string, headers?: object): Promise<T>
    post<T>(url: string, body?: object, headers?: object): Promise<T>
}

export class NetworkHttp implements Http {
    async get<T>(url: string, headers?: object): Promise<T> {
        const res = await axios.get(url, {headers})
        return res.data
    }

    async post<T>(url: string, body?: object, headers?: object): Promise<T> {
        const stringBody = JSON.stringify(body)
        const res = await axios.post(url, stringBody, {headers})
        return res.data
    }
}