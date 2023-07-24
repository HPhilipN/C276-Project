package com.backend.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {

    @GetMapping("/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }

    @GetMapping({ "/", "/login", "/settings", "/recipes", "/cookbook/**", "/admin/**" })
    public String forward() {
        return "forward:/index.html";
    }

}
