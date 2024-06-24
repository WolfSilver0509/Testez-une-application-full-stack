package com.openclassrooms.starterjwt.security.jwt;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class AuthEntryPointJwtTest {

    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;

    @Mock
    private HttpServletRequest httpServletRequest;

    @Autowired
    private HttpServletResponse httpServletResponse;

    @Test
    public void testCommenceMethod() throws ServletException, IOException {
        // Simule le chemin du servlet de la requête
        when(httpServletRequest.getServletPath()).thenReturn("path/to/servlet");

        // Crée une exception d'authentification simulée
        AuthenticationException authenticationException = new AuthenticationException("ExceptionMessage") {
            @Override
            public String getMessage() {
                return super.getMessage();
            }
        };

        // Appelle la méthode commence de AuthEntryPointJwt
        authEntryPointJwt.commence(httpServletRequest, httpServletResponse, authenticationException);

        // Vérifie que la réponse a le statut 401 et le type de contenu JSON
        assertEquals(httpServletResponse.getStatus(), HttpServletResponse.SC_UNAUTHORIZED);
        assertEquals(httpServletResponse.getContentType(), MediaType.APPLICATION_JSON_VALUE);
    }
}


