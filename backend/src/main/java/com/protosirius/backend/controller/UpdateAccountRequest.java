package com.protosirius.backend.controller;

public class UpdateAccountRequest {
        private String email;
        private String password;
            public UpdateAccountRequest() {
        }

        public String getEmail() {
                return email;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public String getPassword() {
                return password;
        }

        public void setPassword(String password) {
                this.password = password;
        }

}
