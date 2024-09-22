package com.sjyt.server.controller

import com.sjyt.server.model.AppUser
import com.sjyt.server.model.User
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/auth/api/users")
class UserController {
    @GetMapping("/me")
    fun getUser(@AuthenticationPrincipal user: OAuth2User): User {
        val email = user.getAttribute<String>("email")
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "No email provided")
        return AppUser(email)
    }
}
