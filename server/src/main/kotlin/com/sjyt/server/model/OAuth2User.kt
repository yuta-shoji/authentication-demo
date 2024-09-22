package com.sjyt.server.model

interface User {
    val email: String
}

data class AppUser(
    override val email: String,
): User
