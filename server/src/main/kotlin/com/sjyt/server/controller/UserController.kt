package com.sjyt.server.controller

import com.sjyt.server.model.AppUser
import com.sjyt.server.model.CustomOAuth2User
import com.sjyt.server.model.User
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class UserController {
    @GetMapping("/me")
    fun getUser(@AuthenticationPrincipal user: CustomOAuth2User): User {
        return AppUser(user.email, user.role)
    }
}
