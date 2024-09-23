import CsrfRepository from "../../../repository/CsrfRepository.ts";

export class DummyCsrfRepository implements CsrfRepository {
    getCsrfToken(): Promise<string> {
        return Promise.resolve('')
    }
}

export class SpyCsrfRepository implements CsrfRepository {
    getCsrfToken_wasCalled = false
    getCsrfToken(): Promise<string> {
        this.getCsrfToken_wasCalled = true
        return Promise.resolve('')
    }
}

export class StubCsrfRepository implements CsrfRepository {
    getCsrfToken_returnValue: Promise<string> = Promise.resolve('')
    getCsrfToken(): Promise<string> {
        return this.getCsrfToken_returnValue
    }
}