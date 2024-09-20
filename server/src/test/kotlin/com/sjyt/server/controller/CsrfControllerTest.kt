package com.sjyt.server.controller

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest
@AutoConfigureMockMvc
class CsrfControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `GETリクエストは、最新のトークンとヘッダーを持つオブジェクトを返す`() {
        val result = mockMvc.perform(
            get("/api/csrf")
        )

        result
            .andExpect { status().isOk }
            .andExpect { jsonPath("$.headerName").value("X-CSRF_TOKEN") }
            .andExpect { jsonPath("$.token").isString }
    }
}
