import User from "../../model/User.ts";

export default class UserBuilder {
    static build(overrides: Partial<User> = {}): User {
        return {
            email: '',
            ...overrides,
        }
    }
}