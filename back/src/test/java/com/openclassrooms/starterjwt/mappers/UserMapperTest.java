package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

public class UserMapperTest {

    private UserMapper userMapper;

    @BeforeEach
    public void setUp() {
        // Initialisation du mapper avant chaque test
        userMapper = Mappers.getMapper(UserMapper.class);
    }

    @Test
    public void testUserToUserDto() {
        // Préparation : création d'un objet User
        User user = User.builder()
                .id(1L)
                .email("testUser@example.com")
                .lastName("Test")
                .firstName("User")
                .password("password")
                .admin(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Exécution : mapping de l'objet User vers UserDto
        UserDto userDto = userMapper.toDto(user);

        // Vérification : s'assurer que les champs de UserDto sont correctement définis
        assertNotNull(userDto);
        assertEquals(user.getId(), userDto.getId());
        assertEquals(user.getEmail(), userDto.getEmail());
        assertEquals(user.getLastName(), userDto.getLastName());
        assertEquals(user.getFirstName(), userDto.getFirstName());
        assertEquals(user.getPassword(), userDto.getPassword());
        assertEquals(user.isAdmin(), userDto.isAdmin());
    }

    @Test
    public void testUserDtoToUser() {
        // Préparation : création d'un objet UserDto
        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setEmail("testUser@example.com");
        userDto.setLastName("Test");
        userDto.setFirstName("User");
        userDto.setPassword("password");
        userDto.setAdmin(true);

        // Exécution : mapping de l'objet UserDto vers User
        User user = userMapper.toEntity(userDto);

        // Vérification : s'assurer que les champs de User sont correctement définis
        assertNotNull(user);
        assertEquals(userDto.getId(), user.getId());
        assertEquals(userDto.getEmail(), user.getEmail());
        assertEquals(userDto.getLastName(), user.getLastName());
        assertEquals(userDto.getFirstName(), user.getFirstName());
        assertEquals(userDto.getPassword(), user.getPassword());
        assertEquals(userDto.isAdmin(), user.isAdmin());
    }

    @Test
    public void testUserListToUserDtoList() {
        // Préparation : création d'une liste d'objets User
        User user1 = User.builder()
                .id(1L)
                .email("user1@example.com")
                .lastName("LastName1")
                .firstName("FirstName1")
                .password("password1")
                .admin(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        User user2 = User.builder()
                .id(2L)
                .email("user2@example.com")
                .lastName("LastName2")
                .firstName("FirstName2")
                .password("password2")
                .admin(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        List<User> userList = Arrays.asList(user1, user2);

        // Exécution : mapping de la liste de User vers une liste de UserDto
        List<UserDto> userDtoList = userMapper.toDto(userList);

        // Vérification : s'assurer que la taille des listes est correcte et que les champs sont correctement définis
        assertNotNull(userDtoList);
        assertEquals(userList.size(), userDtoList.size());
        assertEquals(user1.getId(), userDtoList.get(0).getId());
        assertEquals(user2.getId(), userDtoList.get(1).getId());
    }

    @Test
    public void testUserDtoListToUserList() {
        // Préparation : création d'une liste d'objets UserDto
        UserDto userDto1 = new UserDto();
        userDto1.setId(1L);
        userDto1.setEmail("user1@example.com");
        userDto1.setLastName("LastName1");
        userDto1.setFirstName("FirstName1");
        userDto1.setPassword("password1");
        userDto1.setAdmin(true);

        UserDto userDto2 = new UserDto();
        userDto2.setId(2L);
        userDto2.setEmail("user2@example.com");
        userDto2.setLastName("LastName2");
        userDto2.setFirstName("FirstName2");
        userDto2.setPassword("password2");
        userDto2.setAdmin(false);

        List<UserDto> userDtoList = Arrays.asList(userDto1, userDto2);

        // Exécution : mapping de la liste de UserDto vers une liste de User
        List<User> userList = userMapper.toEntity(userDtoList);

        // Vérification : s'assurer que la taille des listes est correcte et que les champs sont correctement définis
        assertNotNull(userList);
        assertEquals(userDtoList.size(), userList.size());
        assertEquals(userDto1.getId(), userList.get(0).getId());
        assertEquals(userDto2.getId(), userList.get(1).getId());
    }
}
