package com.sjyt.server.service

import com.sjyt.server.repository.CognitoRepository
import org.springframework.stereotype.Service


interface CognitoService {
    fun createEmployeeUser(email: String)
}

@Service
class DefaultCognitoService(
    private val cognitoRepository: CognitoRepository
): CognitoService {
    override fun createEmployeeUser(email: String) {
        cognitoRepository.createEmployeeUser(email)
    }
}
