package com.sjyt.server.model

interface User {
    val email: String
    val role: Role
}

data class AppUser(
    override val email: String,
    override val role: Role,
): User
