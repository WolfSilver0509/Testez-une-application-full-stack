package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeacherServiceTests {

    @InjectMocks
    private TeacherService service;

    @Mock
    private TeacherRepository repository;

    @Test
    void testFindAllTeachers() {
        /*
         * On simule le retour de la méthode findAll du repository
         * et on vérifie que la méthode est appelée et retourne le résultat attendu.
         */
        List<Teacher> expectedTeachers = List.of(new Teacher());
        when(repository.findAll()).thenReturn(expectedTeachers);

        List<Teacher> result = service.findAll();

        verify(repository, times(1)).findAll();
        assertEquals(expectedTeachers, result);
    }

    @Test
    void testFindTeacherById() {
        /*
         * On simule le retour de la méthode findById du repository
         * et on vérifie que la méthode est appelée et retourne le résultat attendu.
         */
        Long teacherId = 1L;
        Teacher expectedTeacher = new Teacher();
        when(repository.findById(teacherId)).thenReturn(Optional.of(expectedTeacher));

        Teacher result = service.findById(teacherId);

        verify(repository, times(1)).findById(teacherId);
        assertEquals(expectedTeacher, result);
    }
}


