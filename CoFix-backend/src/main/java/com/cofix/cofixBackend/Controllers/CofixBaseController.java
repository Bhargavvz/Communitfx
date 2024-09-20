package com.cofix.cofixBackend.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@CrossOrigin
public class CofixBaseController {

    @GetMapping("/")
    public String home() {
        log.info("Redirect to main page");
        return "redirect:/login.html";
    }
}
