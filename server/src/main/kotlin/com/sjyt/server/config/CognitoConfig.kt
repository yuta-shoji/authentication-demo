package com.sjyt.server.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient

@Configuration
class CognitoConfig {
    @Bean
    fun cognitoIdentityProviderClient(
        @Value("\${aws.cognito.region}")
        region: String,
    ): CognitoIdentityProviderClient {
        return CognitoIdentityProviderClient.builder()
            .region(Region.of(region))
            .build()
    }
}
