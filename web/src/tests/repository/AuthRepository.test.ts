import AuthRepository, {DefaultAuthRepository} from "../../repository/AuthRepository.ts";
import {DummyHttp, SpyHttp, StubHttp} from "../http/HttpDoubles.ts";
import Http from "../../http/Http.ts";
import {expect} from "vitest";
import UserBuilder from "../model/UserBuilder.ts";
import {describe, test} from 'vitest'

describe(`${AuthRepository}`, () => {
    describe('getUser', () => {
        test('httpのgetに正しい引数を渡して呼ぶ', () => {
            const spyHttp = new SpyHttp()
            const repository = build(spyHttp)


            repository.getUser()


            expect(spyHttp.get_argument_url).toEqual("/auth/api/users/me")
            expect(spyHttp.get_argument_headers).toEqual(undefined)
        })

        test('httpの返り値を正しく返す', async () => {
            const expectedUser = UserBuilder.build({email: 'expected@example.com'})
            const stubHttp = new StubHttp()
            stubHttp.get_returnValue = Promise.resolve(expectedUser)
            const repository = build(stubHttp)


            const actualUser = await repository.getUser()


            expect(actualUser).toEqual(expectedUser)
        })
    })
})

function build(http: Http = new DummyHttp()) {
    return new DefaultAuthRepository(http)
}