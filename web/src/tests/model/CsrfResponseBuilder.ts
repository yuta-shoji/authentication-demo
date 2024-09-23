import CsrfResponse from "../../model/CsrfResponse.ts";

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