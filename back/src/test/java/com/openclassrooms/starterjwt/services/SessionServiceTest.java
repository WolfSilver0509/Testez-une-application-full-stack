package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SessionServiceTests {

    @InjectMocks
    private SessionService service;

    @Mock
    private SessionRepository repository;

    @Mock
    private UserRepository userRepo;

    @Test
    void testSaveSession() {
        /*
         * On simule le retour de la méthode save du repository
         * et on vérifie que la méthode est appelée et retourne le résultat attendu.
         */
        Session session = new Session();
        when(repository.save(any(Session.class))).thenReturn(session);

        Session result = service.create(session);

        verify(repository, times(1)).save(any(Session.class));
        assertEquals(session, result);
    }

    @Test
    void testDeleteSessionById() {
        /*
         * On vérifie que la méthode deleteById du repository
         * est appelée avec l'ID correct.
         */
        Long id = 1L;
        service.delete(id);

        verify(repository, times(1)).deleteById(id);
    }

    @Test
    void testFindAllSessions() {
        /*
         * On simule le retour de la méthode findAll du repository
         * et on vérifie que la méthode est appelée et retourne le résultat attendu.
         */
        List<Session> sessions = List.of(new Session());
        when(repository.findAll()).thenReturn(sessions);

        List<Session> result = service.findAll();

        verify(repository, times(1)).findAll();
        assertEquals(sessions, result);
    }

    @Test
    void testFindSessionById() {
        /*
         * On simule le retour de la méthode findById du repository
         * et on vérifie que la méthode est appelée et retourne le résultat attendu.
         */
        Long id = 1L;
        Session session = new Session();
        when(repository.findById(any(Long.class))).thenReturn(Optional.of(session));

        Session result = service.getById(id);

        verify(repository, times(1)).findById(id);
        assertEquals(session, result);
    }

    @Test
    void testUpdateSession() {
        /*
         * On simule le retour de la méthode save du repository
         * et on vérifie que la méthode est appelée et retourne le résultat attendu.
         */
        Long id = 1L;
        Session session = new Session();
        when(repository.save(any(Session.class))).thenReturn(session);

        Session result = service.update(id, session);

        verify(repository, times(1)).save(any(Session.class));
        assertEquals(session, result);
    }

    @Test
    void testParticipateInSession() {
        /*
         * On simule le retour des méthodes findById des repositories
         * et on vérifie que la méthode save est appelée avec la session mise à jour.
         */
        Long sessionId = 1L;
        Long userId = 1L;
        Session session = new Session();
        User user = new User();
        user.setId(3L);
        session.setUsers(new ArrayList<>(List.of(user)));

        when(repository.findById(any(Long.class))).thenReturn(Optional.of(session));
        when(userRepo.findById(any(Long.class))).thenReturn(Optional.of(user));

        service.participate(sessionId, userId);

        verify(repository, times(1)).save(any(Session.class));
        assertEquals(2, session.getUsers().size());
    }

    @Test
    void testUserNotFoundForParticipate() {
        /*
         * On vérifie que la méthode participe lève une NotFoundException
         * si l'utilisateur n'est pas trouvé.
         */
        Long sessionId = 1L;
        Long userId = 1L;
        Session session = new Session();

        when(repository.findById(any(Long.class))).thenReturn(Optional.of(session));
        when(userRepo.findById(any(Long.class))).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> service.participate(sessionId, userId));
    }

    @Test
    void testUserAlreadyParticipates() {
        /*
         * On vérifie que la méthode participe lève une BadRequestException
         * si l'utilisateur participe déjà à la session.
         */
        Long sessionId = 1L;
        Long userId = 1L;
        Session session = new Session();
        User user = new User();
        user.setId(userId);
        session.setUsers(List.of(user));

        when(repository.findById(any(Long.class))).thenReturn(Optional.of(session));
        when(userRepo.findById(any(Long.class))).thenReturn(Optional.of(user));

        assertThrows(BadRequestException.class, () -> service.participate(sessionId, userId));
    }

    @Test
    void testSessionNotFoundForNoLongerParticipate() {
        /*
         * On vérifie que la méthode noLongerParticipate lève une NotFoundException
         * si la session n'est pas trouvée.
         */
        Long sessionId = 1L;
        Long userId = 1L;

        when(repository.findById(any(Long.class))).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> service.noLongerParticipate(sessionId, userId));
    }

    @Test
    void testNoLongerParticipate() {
        /*
         * On simule le retour des méthodes findById des repositories
         * et on vérifie que la méthode save est appelée avec la session mise à jour.
         */
        Long sessionId = 1L;
        Long userId = 1L;
        Session session = new Session();
        User user = new User();
        user.setId(userId);
        session.setUsers(List.of(user));

        when(repository.findById(any(Long.class))).thenReturn(Optional.of(session));

        service.noLongerParticipate(sessionId, userId);

        verify(repository, times(1)).save(any(Session.class));
        assertEquals(0, session.getUsers().size());
    }

    @Test
    void testUserNotParticipating() {
        /*
         * On vérifie que la méthode noLongerParticipate lève une BadRequestException
         * si l'utilisateur ne participe pas à la session.
         */
        Long sessionId = 1L;
        Long userId = 1L;
        Session session = new Session();
        User user = new User();
        user.setId(4L);
        session.setUsers(List.of(user));

        when(repository.findById(any(Long.class))).thenReturn(Optional.of(session));

        assertThrows(BadRequestException.class, () -> service.noLongerParticipate(sessionId, userId));
    }
}

