package com.sjyt.server.controller

import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth/api/users")
class UserController {
    @GetMapping("/me")
    fun getUser(@AuthenticationPrincipal user: OAuth2User): String {
        return user.name
    }
}
