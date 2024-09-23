import CsrfRepository, {DefaultCsrfRepository} from "../../repository/CsrfRepository.ts";
import {DummyHttp, SpyHttp, StubHttp} from "../http/HttpDoubles.ts";
import Http from "../../http/Http.ts";
import {expect} from "vitest";
import {describe, test} from 'vitest'
import CsrfResponseBuilder from "../model/CsrfResponseBuilder.ts";

describe(`${CsrfRepository}`, () => {
    describe('getCsrfToken', () => {
        test('httpのgetに正しい引数を渡して呼ぶ', () => {
            const spyHttp = new SpyHttp()
            const repository = build(spyHttp)


            repository.getCsrfToken()


            expect(spyHttp.get_argument_url).toEqual("/api/csrf")
            expect(spyHttp.get_argument_headers).toEqual(undefined)
        })

        test('httpが返すCsrfResponseのtokenを正しく返す', async () => {
            const expectedCsrfResponse = CsrfResponseBuilder.build({token: 'expected token'})
            const stubHttp = new StubHttp()
            stubHttp.get_returnValue = Promise.resolve(expectedCsrfResponse)
            const repository = build(stubHttp)


            const actualCsrfToken = await repository.getCsrfToken()


            expect(actualCsrfToken).toEqual(expectedCsrfResponse.token)
        })
    })
})

function build(http: Http = new DummyHttp()) {
    return new DefaultCsrfRepository(http)
}