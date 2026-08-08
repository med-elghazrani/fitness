package com.protosirius.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.protosirius.backend.entity.User;
import com.protosirius.backend.repository.UserRepository;

@Service
public class AccountService {
        private final UserRepository userRepository;

        private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";

        public AccountService(UserRepository userRepository) {
                this.userRepository = userRepository;
        }


        public User getAccount(int userId) {
                return userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé , esseye de t'inscrie"));
        }

        public User updateAccount(int userId,String newEmail, String newPassword) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé , esseye de t'inscrie"));

                if (newEmail != null && !newEmail.isEmpty()) {
                        if (!newEmail.matches(EMAIL_REGEX)) {
                                throw new IllegalArgumentException("format d'Email non valide I-I");
                        }
                        if (userRepository.existsByEmail(newEmail)) {
                                throw new IllegalArgumentException("Email déjà utilisé par un autre compte");
                        }
                        user.setEmail(newEmail);
                }

                if (newPassword != null && !newPassword.isEmpty()) {
                        user.setMotDePasse(newPassword);
                }
                else{
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Mot de passe obligatoire");
                }

                return userRepository.save(user);
        }



}
