package com.sjyt.server.authentication

import com.sjyt.server.model.CustomOAuth2User
import com.sjyt.server.model.Role
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.security.oauth2.core.OAuth2AuthenticationException
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.stereotype.Component


@Component
class CustomOAuth2SuccessHandler(
    @Value("\${authorization.redirectUrl}")
    private val redirectUrl: String,
): AuthenticationSuccessHandler {
    override fun onAuthenticationSuccess(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        authentication: Authentication?
    ) {
        val oauth2AuthenticationToken = authentication as OAuth2AuthenticationToken
        val registrationId = oauth2AuthenticationToken.authorizedClientRegistrationId
        val oauth2User = authentication.principal as OAuth2User
        val role = when (registrationId) {
            "cognito" -> {
                val groups = (oauth2User.getAttribute<List<String>>("cognito:groups"))
                groups?.firstOrNull()
                    ?.let { Role.init(it) }
                    ?: throw OAuth2AuthenticationException("oauth2 user dose not have cognito:groups")
            }
            else -> {
                Role.EMPLOYEE
            }
        }
        val email = oauth2User.getAttribute<String>("email")
            ?: throw OAuth2AuthenticationException("oauth2 user dose not have email")
        val authorities = listOf(SimpleGrantedAuthority("ROLE_$role"))

        val customOAuth2User = CustomOAuth2User(
            "CognitoUser",
            authorities,
            oauth2User.attributes,
            email,
            role
        )

        val newOAuth2AuthenticationToken = OAuth2AuthenticationToken(
            customOAuth2User,
            authorities,
            registrationId
        )

        SecurityContextHolder.getContext().authentication = newOAuth2AuthenticationToken
        response?.sendRedirect(redirectUrl)
    }
}