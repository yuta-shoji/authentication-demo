package com.sjyt.server.model

enum class Role {
    ADMIN,
    MANAGER,
    EMPLOYEE;

    companion object {
        fun init(roleString: String): Role {
            return when (roleString) {
                "ADMIN" -> ADMIN
                "MANAGER" -> MANAGER
                "EMPLOYEE" -> EMPLOYEE
                else -> EMPLOYEE
            }
        }
    }
}