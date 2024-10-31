package com.sjyt.server.controller.cognito

import com.sjyt.server.model.CreateUserBody
import com.sjyt.server.service.CognitoService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth/cognito")
class CognitoController(
    private val cognitoService: CognitoService
) {
    @PostMapping("/create-user/employee")
    fun createEmployeeUser(
        @RequestBody body: CreateUserBody
    ) {
        cognitoService.createEmployeeUser(body.email)
    }
}