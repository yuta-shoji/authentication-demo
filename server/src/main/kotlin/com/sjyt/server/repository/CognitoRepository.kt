package com.sjyt.server.repository

import com.sjyt.server.model.CognitoUserGroups
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Repository
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminAddUserToGroupRequest
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminCreateUserRequest

interface CognitoRepository {
    fun createEmployeeUser(email: String)
}

@Repository
class DefaultCognitoRepository(
    private val cognitoClient: CognitoIdentityProviderClient,
    @Value("\${aws.cognito.user-pool-id}")
    private val userPoolId: String,
) : CognitoRepository {
    override fun createEmployeeUser(email: String) {
        val createUserRequest = AdminCreateUserRequest.builder()
            .userPoolId(userPoolId)
            .username(email)
            .build()

        cognitoClient.adminCreateUser(createUserRequest)

        val addUserToGroupRequest = AdminAddUserToGroupRequest.builder()
            .userPoolId(userPoolId)
            .username(email)
            .groupName(CognitoUserGroups.EMPLOYEE.toString())
            .build()

        cognitoClient.adminAddUserToGroup(addUserToGroupRequest)
    }
}