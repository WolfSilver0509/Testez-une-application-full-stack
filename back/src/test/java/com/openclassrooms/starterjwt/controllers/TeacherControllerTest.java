package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatExceptionOfType;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

/* Test du controleur TeacherController
 * Ces tests vérifient le comportement du controleur en fonction des différentes requêtes HTTP envoyées
 * et s'assurent qu'il retourne les bonnes réponses.
 */
@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("Tests unitaires du controleur TeacherController")
@WithMockUser
public class TeacherControllerTest {

    private static final String TEACHER_PATH = "/api/teacher";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private TeacherMapper teacherMapper;
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TeacherService teacherService;

    private Teacher teacher;

    @BeforeEach
    public void setup() {
        teacher = Teacher.builder()
                .id(1L)
                .lastName("Yumi")
                .firstName("Ishiyama")
                .createdAt(LocalDateTime.now())
                .updatedAt(null)
                .build();
    }

    @Test
    /*
     * Ce test vérifie si le controleur renvoie une réponse avec le statut OK
     * et l'enseignant attendu lorsqu'on l'appelle avec l'ID d'un enseignant existant
     */
    public void givenTeacherId_whenCallFindById_thenReturnResponseWithStatusOKAndTheTeacherExpected() throws Exception {
        // Simule la récupération d'un enseignant par ID
        when(teacherService.findById(1L)).thenReturn(teacher);

        // Effectue une requête GET et vérifie le statut de la réponse
        MvcResult result = mockMvc.perform(get(TeacherControllerTest.TEACHER_PATH + "/{id}", "1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        // Vérifie que la réponse contient les bonnes informations
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(teacherMapper.toDto(teacher)));
        assertThat(result.getResponse().getContentAsString()).contains(teacher.getFirstName());
    }

    @Test
    /*
     * Ce test vérifie si le controleur renvoie une réponse avec le statut introuvable
     * lorsqu'on l'appelle avec l'ID d'un enseignant inexistant
     */
    public void givenTeacherId_whenCallFindById_thenReturnResponseWithStatusNotFound() throws Exception {
        // Simule une situation où l'enseignant n'est pas trouvé
        when(teacherService.findById(2L)).thenReturn(null);

        // Effectue une requête GET et vérifie le statut de la réponse
        mockMvc.perform(get(TeacherControllerTest.TEACHER_PATH + "/{id}", "2"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    /*
     * Ce test vérifie si le controleur renvoie une réponse avec le statut de mauvaise requête
     * lorsqu'on l'appelle avec un ID d'enseignant invalide (format non numérique)
     */
    public void givenInvalidTeacherId_whenCallFindById_thenReturnResponseWithStatusBadRequest() throws Exception {
        // ID invalide
        String id = "Code invalide";

        // Effectue une requête GET et vérifie le statut de la réponse
        mockMvc.perform(get(TeacherControllerTest.TEACHER_PATH + "/{id}", id))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());

        // Vérifie qu'une exception est levée pour un format d'ID incorrect
        assertThatExceptionOfType(NumberFormatException.class).isThrownBy(() -> Long.parseLong(id));
    }

    @Test
    /*
     * Ce test vérifie si le controleur renvoie une réponse avec le statut OK
     * et une liste d'enseignants lorsqu'on appelle la méthode findAll
     */
    public void whenCallFindAll_thenResponseOkStatusWithAListOfTeachers() throws Exception {
        // Prépare une liste d'enseignants
        List<Teacher> teachers = new ArrayList<>();
        teachers.add(teacher);
        List<TeacherDto> dtoTeachers = this.teacherMapper.toDto(teachers);

        // Simule la récupération de tous les enseignants
        when(teacherService.findAll()).thenReturn(teachers);

        // Effectue une requête GET et vérifie le statut de la réponse
        MvcResult result = mockMvc.perform(get(TeacherControllerTest.TEACHER_PATH))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        // Convertit la réponse en liste de TeacherDto
        List<TeacherDto> teachersDtoReceived = Arrays.asList(objectMapper.readValue(result.getResponse().getContentAsString(), TeacherDto[].class));

        // Vérifie que la réponse contient la bonne liste d'enseignants
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(dtoTeachers));
        assertThat(teachersDtoReceived.size()).isEqualTo(1);
        assertThat(teachersDtoReceived.get(0).getFirstName()).isEqualTo(teacher.getFirstName());
    }

}
