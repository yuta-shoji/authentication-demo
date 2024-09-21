import axios from 'axios'

export default interface Http {
    get<T>(url: string, headers?: object): Promise<T>
}

export class NetworkHttp implements Http {
    async get<T>(url: string, headers?: object): Promise<T> {
        const res = await axios.get(
            url,
            {headers}
        )
        return res.data
    }
}