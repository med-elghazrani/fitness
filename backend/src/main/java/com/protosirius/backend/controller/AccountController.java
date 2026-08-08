package com.protosirius.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.protosirius.backend.entity.User;
import com.protosirius.backend.service.AccountService;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/account")
public class AccountController {

        private final AccountService accountService;

        public AccountController(AccountService accountService) {
                this.accountService = accountService;
        }

        @GetMapping("/{id}")
        public AccountResponse getAccount(@PathVariable int id) {
                User user = accountService.getAccount(id);
                return AccountResponse.fromUser(user);
    }

        @PutMapping("/{id}")
        public AccountResponse update(@PathVariable int id,@RequestBody UpdateAccountRequest request) {
                User updated =accountService.updateAccount(id,request.getEmail(), request.getPassword());
                return AccountResponse.fromUser(updated);
        }
}
