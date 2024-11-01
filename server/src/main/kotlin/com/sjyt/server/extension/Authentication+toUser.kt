package com.sjyt.server.extension

import com.sjyt.server.model.AppUser
import org.springframework.security.core.Authentication

fun Authentication.toUser(): AppUser {
    return principal as AppUser
}