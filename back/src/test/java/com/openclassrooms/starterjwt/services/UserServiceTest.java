package com.openclassrooms.starterjwt.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

/**
 * Classe de test pour UserService.
 * Cette classe vérifie le comportement de UserService
 * en simulant les interactions avec UserRepository.
 */
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    /**
     * Instance de UserService injectée avec Mockito.
     */
    @InjectMocks
    private UserService userService;

    /**
     * Mock de UserRepository créé avec Mockito.
     */
    @Mock
    private UserRepository userRepository;

    /**
     * Test vérifiant l'appel de la méthode deleteById de UserRepository.
     * Ce test s'assure que UserService délègue correctement la suppression
     * d'un utilisateur à UserRepository.
     */
    @Test
    public void testSuppressionUtilisateurParId() {
        // Étant donné (Given)
        Long id = 1L;

        // Lorsque (When)
        userService.delete(id);

        // Alors (Then)
        verify(userRepository, times(1)).deleteById(id);
    }

    /**
     * Test vérifiant l'appel de la méthode findById de UserRepository.
     * Ce test s'assure que UserService récupère correctement un utilisateur
     * par son identifiant en simulant une recherche réussie dans UserRepository.
     */
    @Test
    public void testRechercheUtilisateurParId() {
        // Étant donné (Given)
        Long id = 1L;
        User user = new User();

        // Lorsque (When)
        when(userRepository.findById(id)).thenReturn(Optional.of(user)); // Optional.of pour encapsuler la valeur
        User user1 = userService.findById(id);

        // Alors (Then)
        verify(userRepository, times(1)).findById(id);
        assertEquals(user, user1);
    }
}
