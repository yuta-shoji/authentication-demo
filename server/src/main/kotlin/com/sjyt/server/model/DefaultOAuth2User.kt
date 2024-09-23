package com.sjyt.server.model

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.core.user.OAuth2User

class DefaultOAuth2User(
    private val authorities: Collection<GrantedAuthority>,
    private val name: String,
    email: String,
) : OAuth2User {
    private val attributes = mapOf("email" to email)

    override fun getName(): String {
        return name
    }

    override fun getAttributes(): Map<String, Any> {
        return attributes
    }

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities
    }
}