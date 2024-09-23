package com.sjyt.server.config

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository

@EnableWebSecurity
@Configuration
class SecurityConfig {
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf {
                it.csrfTokenRepository(HttpSessionCsrfTokenRepository())
                it.ignoringRequestMatchers("/logout")
            }
            .authorizeHttpRequests {
                it.requestMatchers("/auth/api/users/me").authenticated()
                it.requestMatchers("/api/**").authenticated()
                it.requestMatchers( "/logout").permitAll()
                it.anyRequest().permitAll()
            }
            .oauth2Login {
                it.defaultSuccessUrl("http://localhost:5173", true)
            }
            .exceptionHandling {
                it.authenticationEntryPoint(CustomAuthenticationEntryPoint())
            }
            .logout {
                it.logoutSuccessUrl("http://localhost:5173")
            }

        return http.build()
    }
}

class CustomAuthenticationEntryPoint: AuthenticationEntryPoint {
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized")
    }
}