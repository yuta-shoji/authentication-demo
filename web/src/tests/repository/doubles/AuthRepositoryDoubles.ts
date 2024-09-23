import AuthRepository from "../../../repository/AuthRepository.ts";
import User from "../../../model/User.ts";
import UserBuilder from "../../model/UserBuilder.ts";

export class DummyAuthRepository implements AuthRepository {
    getUser(): Promise<User> {
        return Promise.resolve(UserBuilder.build())
    }
}

export class SpyAuthRepository implements AuthRepository {
    getUser_wasCalled = false
    getUser(): Promise<User> {
        this.getUser_wasCalled = true
        return Promise.resolve(UserBuilder.build())
    }
}

export class StubAuthRepository implements AuthRepository {
    getUser_returnValue: Promise<User> = Promise.resolve(UserBuilder.build())
    getUser(): Promise<User> {
        return this.getUser_returnValue
    }
}