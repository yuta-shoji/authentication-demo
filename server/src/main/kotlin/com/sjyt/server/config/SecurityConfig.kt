package com.sjyt.server.config

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository
import java.io.File
import java.nio.file.Files

@EnableWebSecurity
@Configuration
class SecurityConfig(
    @Value("\${spring.security.oauth2.client.provider.cognito.issuer-uri}")
    private val cognitoIssuerUri: String,
) {
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf {
                it.csrfTokenRepository(HttpSessionCsrfTokenRepository())
                it.ignoringRequestMatchers("/logout")
            }
            .authorizeHttpRequests {
                it
                    .requestMatchers("/**").hasAnyRole("ADMIN")
                    .requestMatchers("/auth/api/users/me").authenticated()
                    .requestMatchers("/api/**").authenticated()
                    .requestMatchers("/logout").permitAll()
                    .anyRequest().permitAll()
            }
            .oauth2Login {
//                it.defaultSuccessUrl("http://localhost:8080", true)
                it.successHandler(CustomAuthenticationSuccessHandler())
            }
            .exceptionHandling {
                it.authenticationEntryPoint(CustomAuthenticationEntryPoint())
            }
            .logout {
                it.logoutSuccessUrl("http://localhost:8080")
            }

        return http.build()
    }

    @Bean
    fun userAuthoritiesMapper(): GrantedAuthoritiesMapper {
        return GrantedAuthoritiesMapper { authorities: Collection<GrantedAuthority>? ->
            if (authorities.isNullOrEmpty()) return@GrantedAuthoritiesMapper emptySet<GrantedAuthority>()

            val authority = authorities.first()
            if (authority !is OidcUserAuthority) return@GrantedAuthoritiesMapper emptySet<GrantedAuthority>()

            val mappedAuthorities: MutableSet<GrantedAuthority?> = HashSet()
            val googleIssuerUri = "https://accounts.google.com"
            val issuer = authority.idToken.issuer.toString()
            println("-------------------------------issuer: $issuer")

            when (issuer) {
                cognitoIssuerUri -> {
                    val roles = (authority.attributes["cognito:groups"] as? List<*>)
                        ?: emptyList<GrantedAuthority>()
                    val roleAuthorities = roles
                        .map { role -> SimpleGrantedAuthority("ROLE_$role") }
                    println("roleAuthorities: $roleAuthorities")
                    mappedAuthorities.addAll(roleAuthorities)
                }

                googleIssuerUri -> {
                    val employeeRole = SimpleGrantedAuthority("ROLE_EMPLOYEE")
                    mappedAuthorities.add(employeeRole)
                }
            }
            mappedAuthorities
        }
    }
}

class CustomAuthenticationSuccessHandler : AuthenticationSuccessHandler {
    override fun onAuthenticationSuccess(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication
    ) {
        val authorities = authentication.authorities.map { it.authority }

        println("=================================")
        if (authorities.contains("ROLE_ADMIN")) {
            println("ADMIN")
            response.sendRedirect("http://localhost:8080")
        } else if (authorities.contains("ROLE_TEST")) {
            println("TEST")
            val htmlFile = File("src/main/resources/static/test.html")
            if (htmlFile.exists()) {
                response.contentType = "text/html"
                response.characterEncoding = "UTF-8"
                Files.copy(htmlFile.toPath(), response.outputStream)
                response.outputStream.flush()
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Page not found")
            }
        } else {
            println("OTHER")
            // その他のユーザーの場合はデフォルトの動作に設定
            response.sendRedirect("/")
        }
    }
}


class CustomAuthenticationEntryPoint : AuthenticationEntryPoint {
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized")
    }
}