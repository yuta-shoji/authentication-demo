package com.sjyt.server.controller

import org.springframework.security.web.csrf.CsrfToken
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/csrf")
class CsrfController {
    @GetMapping
    fun getCsrfToken(token: CsrfToken): CsrfToken {
        return token
    }
}