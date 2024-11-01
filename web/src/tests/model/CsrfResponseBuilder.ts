import CsrfResponse from "../../model/response/CsrfResponse.ts";

export default class CsrfResponseBuilder {
    static build(overrides: Partial<CsrfResponse> = {}): CsrfResponse {
        return {
            headerName: '',
            parameterName: '',
            token: '',
            ...overrides,
        }
    }
}