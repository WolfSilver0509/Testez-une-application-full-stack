package com.openclassrooms.starterjwt.security;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;

public class UserDetailsImplTest {

    private UserDetailsImpl userDetails;

    @BeforeEach
    public void setUp() {
        // Initialisation de l'objet UserDetailsImpl avant chaque test
        userDetails = UserDetailsImpl.builder()
                .id(1L)
                .username("testUser")
                .firstName("Yumi")
                .lastName("Ishiyama")
                .admin(true)
                .password("codeProgrammation")
                .build();
    }

    @Test
    public void testGetAuthorities() {
        // Exécution : appel de la méthode getAuthorities()
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

        // Vérification : s'assurer que la collection retournée n'est pas nulle
        assertNotNull(authorities);
        assertTrue(authorities.isEmpty());  // Dans cet exemple, on s'attend à une collection vide
    }

    @Test
    public void testIsAccountNonExpired() {
        // Exécution : appel de la méthode isAccountNonExpired()
        boolean isAccountNonExpired = userDetails.isAccountNonExpired();

        // Vérification : s'assurer que le compte n'expire pas
        assertTrue(isAccountNonExpired);
    }

    @Test
    public void testIsAccountNonLocked() {
        // Exécution : appel de la méthode isAccountNonLocked()
        boolean isAccountNonLocked = userDetails.isAccountNonLocked();

        // Vérification : s'assurer que le compte n'est pas verrouillé
        assertTrue(isAccountNonLocked);
    }

    @Test
    public void testIsCredentialsNonExpired() {
        // Exécution : appel de la méthode isCredentialsNonExpired()
        boolean isCredentialsNonExpired = userDetails.isCredentialsNonExpired();

        // Vérification : s'assurer que les informations d'identification ne sont pas expirées
        assertTrue(isCredentialsNonExpired);
    }

    @Test
    public void testIsEnabled() {
        // Exécution : appel de la méthode isEnabled()
        boolean isEnabled = userDetails.isEnabled();

        // Vérification : s'assurer que le compte est activé
        assertTrue(isEnabled);
    }

    @Test
    public void testEqualsSameObject() {
        // Préparation : créer un autre objet UserDetailsImpl avec le même ID
        UserDetailsImpl sameUserDetails = UserDetailsImpl.builder()
                .id(1L)
                .build();

        // Vérification : s'assurer que les deux objets sont égaux
        assertEquals(userDetails, sameUserDetails);
    }

    @Test
    public void testEqualsDifferentObject() {
        // Préparation : créer un autre objet UserDetailsImpl avec un ID différent
        UserDetailsImpl differentUserDetails = UserDetailsImpl.builder()
                .id(2L)
                .build();

        // Vérification : s'assurer que les deux objets ne sont pas égaux
        assertNotEquals(userDetails, differentUserDetails);
    }
}
