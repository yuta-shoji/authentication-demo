package com.sjyt.server.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class RouteController {
    @RequestMapping( "/{path:[^\\.]*}")
    fun index(): String {
        return "forward:/";
    }
}
