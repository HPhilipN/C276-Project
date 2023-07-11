package com.backend.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {
    
    @GetMapping("{_:^(?!index\\.html$).*$}")
    public String redirect() {
        return "forward:/index.html";
    }
}

