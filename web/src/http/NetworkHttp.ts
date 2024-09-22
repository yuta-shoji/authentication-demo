import axios from 'axios'

export default interface Http {
    get<T>(url: string, headers?: object): Promise<T>
    post(url: string, body?: string, headers?: object): Promise<object>
}

export class NetworkHttp implements Http {
    async get<T>(url: string, headers?: object): Promise<T> {
        const res = await axios.get(url, {headers})
        return res.data
    }

    async post(url: string, body?: string, headers?: object) {
        const res = await axios.post(url, body, {headers})
        return res.data
    }
}