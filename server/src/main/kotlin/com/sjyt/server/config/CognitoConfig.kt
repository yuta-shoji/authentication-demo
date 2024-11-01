package com.sjyt.server.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient

@Configuration
class CognitoConfig {
    @Bean
    fun cognitoIdentityProviderClient(
        @Value("\${aws.cognito.region}")
        region: String,
        @Value("\${aws.access-key-id}")
        accessKeyId: String,
        @Value("\${aws.secret-access-key}")
        secretAccessKey: String,
        @Value("\${aws.session-token}")
        sessionToken: String,
    ): CognitoIdentityProviderClient {
        val awsSessionCredentials = AwsSessionCredentials
            .create(accessKeyId, secretAccessKey, sessionToken)
        return CognitoIdentityProviderClient.builder()
            .credentialsProvider { awsSessionCredentials }
            .region(Region.of(region))
            .build()
    }
}
