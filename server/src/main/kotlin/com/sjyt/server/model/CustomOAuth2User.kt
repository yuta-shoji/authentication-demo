package com.sjyt.server.model

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.core.user.OAuth2User

data class CustomOAuth2User(
    private val name: String,
    private val authorities: Collection<GrantedAuthority>,
    private val attributes: MutableMap<String, Any>,
    val email: String,
    val role: Role,
): OAuth2User {
    override fun getName(): String {
        return name
    }

    override fun getAttributes(): MutableMap<String, Any> {
        return attributes
    }

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities
    }
}