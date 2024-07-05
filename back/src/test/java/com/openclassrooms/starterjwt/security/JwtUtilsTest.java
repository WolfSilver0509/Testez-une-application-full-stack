package com.openclassrooms.starterjwt.security.jwt;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class JwtUtilsTest {

    private JwtUtils jwtUtils;

    @Value("${oc.app.jwtSecret}")
    private String jwtSecret = "testSecret";

    @Value("${oc.app.jwtExpirationMs}")
    private int jwtExpirationMs = 60000; // 1 minute pour les tests

    @BeforeEach
    public void setUp() {
        jwtUtils = new JwtUtils();
        // Injection des valeurs pour jwtSecret et jwtExpirationMs dans jwtUtils
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", jwtSecret);
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", jwtExpirationMs);
    }

    @Test
    public void testGenerateJwtToken() {
        // Préparation
        Authentication authentication = mock(Authentication.class);
        UserDetailsImpl userPrincipal = UserDetailsImpl.builder().username("testUser").build();
        when(authentication.getPrincipal()).thenReturn(userPrincipal);

        // Exécution
        String token = jwtUtils.generateJwtToken(authentication);

        // Vérification
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    public void testGetUserNameFromJwtToken() {
        // Préparation
        String username = "testUser";
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        // Exécution
        String extractedUsername = jwtUtils.getUserNameFromJwtToken(token);

        // Vérification
        assertEquals(username, extractedUsername);
    }

    @Test
    public void testValidateJwtToken() {
        // Préparation
        String username = "testUser";
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        // Exécution
        boolean isValid = jwtUtils.validateJwtToken(token);

        // Vérification
        assertTrue(isValid);
    }

    @Test
    public void testValidateJwtToken_ExpiredToken() throws InterruptedException {
        // Préparation
        String username = "testUser";
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 1000)) // 1 seconde pour expiration rapide
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
        Thread.sleep(2000); // Attendre pour s'assurer que le token est expiré

        // Exécution
        boolean isValid = jwtUtils.validateJwtToken(token);

        // Vérification
        assertFalse(isValid);
    }

    @Test
    public void testValidateJwtToken_InvalidSignature() {
        // Préparation
        String username = "testUser";
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, "wrongSecret") // Utiliser un mauvais secret
                .compact();

        // Exécution
        boolean isValid = jwtUtils.validateJwtToken(token);

        // Vérification
        assertFalse(isValid);
    }

    @Test
    public void testValidateJwtToken_MalformedToken() {
        // Préparation
        String malformedToken = "thisIsNotAValidToken";

        // Exécution
        boolean isValid = jwtUtils.validateJwtToken(malformedToken);

        // Vérification
        assertFalse(isValid);
    }

    @Test
    public void testValidateJwtToken_UnsupportedToken() {
        // Préparation
        String unsupportedToken = Jwts.builder()
                .setPayload("UnsupportedPayload")
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        // Exécution
        boolean isValid = jwtUtils.validateJwtToken(unsupportedToken);

        // Vérification
        assertFalse(isValid);
    }

    @Test
    public void testValidateJwtToken_EmptyClaims() {
        // Préparation
        String emptyClaimsToken = Jwts.builder()
                .setSubject("") // Définit un sujet vide au lieu de ne rien définir
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        // Exécution
        boolean isValid = jwtUtils.validateJwtToken(emptyClaimsToken);

        // Vérification
        assertTrue(isValid);
    }
}
