package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

public class TeacherMapperTest {

    private TeacherMapper teacherMapper;

    @BeforeEach
    public void setUp() {
        // Initialisation du mapper avant chaque test
        teacherMapper = Mappers.getMapper(TeacherMapper.class);
    }

    @Test
    public void testTeacherToTeacherDto() {
        // Préparation : création d'un objet Teacher
        Teacher teacher = Teacher.builder()
                .id(1L)
                .lastName("Smith")
                .firstName("John")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Exécution : mapping de l'objet Teacher vers TeacherDto
        TeacherDto teacherDto = teacherMapper.toDto(teacher);

        // Vérification : s'assurer que les champs de TeacherDto sont correctement définis
        assertNotNull(teacherDto);
        assertEquals(teacher.getId(), teacherDto.getId());
        assertEquals(teacher.getLastName(), teacherDto.getLastName());
        assertEquals(teacher.getFirstName(), teacherDto.getFirstName());
    }

    @Test
    public void testTeacherDtoToTeacher() {
        // Préparation : création d'un objet TeacherDto
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setId(1L);
        teacherDto.setLastName("Smith");
        teacherDto.setFirstName("John");

        // Exécution : mapping de l'objet TeacherDto vers Teacher
        Teacher teacher = teacherMapper.toEntity(teacherDto);

        // Vérification : s'assurer que les champs de Teacher sont correctement définis
        assertNotNull(teacher);
        assertEquals(teacherDto.getId(), teacher.getId());
        assertEquals(teacherDto.getLastName(), teacher.getLastName());
        assertEquals(teacherDto.getFirstName(), teacher.getFirstName());
    }

    @Test
    public void testTeacherListToTeacherDtoList() {
        // Préparation : création d'une liste d'objets Teacher
        Teacher teacher1 = Teacher.builder()
                .id(1L)
                .lastName("Smith")
                .firstName("John")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Teacher teacher2 = Teacher.builder()
                .id(2L)
                .lastName("Doe")
                .firstName("Jane")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        List<Teacher> teacherList = Arrays.asList(teacher1, teacher2);

        // Exécution : mapping de la liste de Teacher vers une liste de TeacherDto
        List<TeacherDto> teacherDtoList = teacherMapper.toDto(teacherList);

        // Vérification : s'assurer que la taille des listes est correcte et que les champs sont correctement définis
        assertNotNull(teacherDtoList);
        assertEquals(teacherList.size(), teacherDtoList.size());
        assertEquals(teacher1.getId(), teacherDtoList.get(0).getId());
        assertEquals(teacher2.getId(), teacherDtoList.get(1).getId());
    }

    @Test
    public void testTeacherDtoListToTeacherList() {
        // Préparation : création d'une liste d'objets TeacherDto
        TeacherDto teacherDto1 = new TeacherDto();
        teacherDto1.setId(1L);
        teacherDto1.setLastName("Morales");
        teacherDto1.setFirstName("Jim");

        TeacherDto teacherDto2 = new TeacherDto();
        teacherDto2.setId(2L);
        teacherDto2.setLastName("Hopper");
        teacherDto2.setFirstName("Franz");

        List<TeacherDto> teacherDtoList = Arrays.asList(teacherDto1, teacherDto2);

        // Exécution : mapping de la liste de TeacherDto vers une liste de Teacher
        List<Teacher> teacherList = teacherMapper.toEntity(teacherDtoList);

        // Vérification : s'assurer que la taille des listes est correcte et que les champs sont correctement définis
        assertNotNull(teacherList);
        assertEquals(teacherDtoList.size(), teacherList.size());
        assertEquals(teacherDto1.getId(), teacherList.get(0).getId());
        assertEquals(teacherDto2.getId(), teacherList.get(1).getId());
    }
}
