package com.protosirius.backend.service;

import com.protosirius.backend.controller.RegisterRequest;
import com.protosirius.backend.entity.User;
import com.protosirius.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Calendar;
import java.util.Date;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email deja utilise");
        }

        Calendar calendar = Calendar.getInstance();
        calendar.set(request.anneeNaissance(), Calendar.JANUARY, 1);
        Date dateNaissance = calendar.getTime();

        User user = new User(
                request.nom(),
                request.prenom(),
                request.email(),
                request.motDePasse(),
                dateNaissance,
                request.sex(),
                request.poids(),
                request.taille()
        );

        return userRepository.save(user);
    }


    public User login(String email, String motDePasse) {
        User user = userRepository.findByEmail(email);
        if (user == null || !user.getMotDePasse().equals(motDePasse)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou mot de passe incorrect");
        }
        return user;
    }
}
