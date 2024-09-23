package com.sjyt.server.controller

import com.sjyt.server.model.DefaultOAuth2User
import org.hamcrest.CoreMatchers.equalTo
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import kotlin.test.Test

@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("/auth/api/users")
class UserControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Nested
    @DisplayName("/me [GET]")
    inner class GetUser {
        @Test
        fun principalからユーザー情報を抽出してAppUserを返す() {
            val expectedEmail = "expected@example.com"
            val user = DefaultOAuth2User(
                authorities = listOf(),
                name = "some name",
                email = expectedEmail,
            )

            val result = mockMvc.get("/auth/api/users/me") {
                with(
                    oauth2Login()
                        .oauth2User(user)
                )
            }

            result
                .andExpect { status { isOk() } }
                .andExpect { jsonPath("$.email", equalTo(expectedEmail)) }
        }
    }
}