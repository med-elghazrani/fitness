package com.protosirius.backend.controller;

import com.protosirius.backend.entity.User;
import com.protosirius.backend.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/register")
    public AccountResponse register(@RequestBody RegisterRequest request) {
        User user = authService.register(request);
        return AccountResponse.fromUser(user);
    }

    @PostMapping("/login")
    public AccountResponse login(@RequestBody LoginRequest request) {
        User user = authService.login(request.email(), request.motDePasse());
        return AccountResponse.fromUser(user);
    }
}
