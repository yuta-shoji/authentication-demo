package com.sjyt.server.model

enum class Role {
    ADMIN,
    MANAGER,
    EMPLOYEE,
    TEST;

    companion object {
        fun init(roleString: String): Role {
            return when (roleString) {
                "ADMIN" -> ADMIN
                "MANAGER" -> MANAGER
                "EMPLOYEE" -> EMPLOYEE
                "TEST" -> TEST
                else -> EMPLOYEE
            }
        }
    }
}