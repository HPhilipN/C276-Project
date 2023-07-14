package com.backend.backend;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.backend.backend.models.Password;
import com.backend.backend.models.User;
import com.backend.backend.models.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "file:${user.dir}/.env")
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private User testUser = new User("testuser", "testuser@example.com", "testpassword", false, false);
    private User loginUser = new User("user", "user@test.com", "pass123", true, false);

    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/users/view"))
                .andExpect(MockMvcResultMatchers.status().isOk()) // isOk = 200
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));

        System.out.println("Passed test for /users/view");
    }

    @Test
    public void testGetUserLogin() throws Exception {
        // send loginUser as JSON body to the endpoint
        mockMvc.perform(MockMvcRequestBuilders.post("/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"" + loginUser.getName() + "\",\"email\":\"" + loginUser.getEmail()
                        + "\",\"password\":\"" + loginUser.getPassword() + "\",\"chef\":" + loginUser.isChef()
                        + ",\"moderator\":" + loginUser.isModerator() + "}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("user@test.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("User1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.chef").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.moderator").value(false));

        System.out.println("Passed test for /users/login");
    }

    @Test
    @Order(1)
    public void testAddUserSignup() throws Exception {
        // NOTE: Should fail with 401 if User already exists
        mockMvc.perform(MockMvcRequestBuilders.post("/users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"" + testUser.getName() + "\",\"email\":\"" + testUser.getEmail()
                        + "\",\"password\":\"" + testUser.getPassword() + "\",\"chef\":" + testUser.isChef()
                        + ",\"moderator\":" + testUser.isModerator() + "}"))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().string("true"));

        System.out.println("Passed test for /users/signup");
    }

    @Test
    @Order(2)
    public void testDeleteIndividualUser() throws Exception {
        // delete the user created in /users/signup test
        int testUserUid = userRepo.findByEmail("testuser@example.com").getUid();

        mockMvc.perform(MockMvcRequestBuilders.delete("/users/delete/{uid}", testUserUid))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));

        // Verify the user has been deleted
        boolean userExists = userRepo.existsById(testUser.getUid());
        Assertions.assertThat(userExists).isFalse();

        System.out.println("Passed test for /users/delete/{uid}");
    }

    @Test
    public void testUpdateUser() throws Exception {
        User existingUser = userRepo.findByEmail("user2@test.com");

        // Password changed at different endpoint thus not needed here
        // DO NOT change email here, crucial to test functionality
        User updatedUser = new User("updatedUser", "user2@test.com", "", true, false);

        // Perform the PUT request
        mockMvc.perform(MockMvcRequestBuilders.put("/users/update/{uid}", existingUser.getUid())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"" + updatedUser.getName() + "\",\"email\":\"" + updatedUser.getEmail()
                        + "\",\"password\":\"" + updatedUser.getPassword() + "\",\"chef\":" + updatedUser.isChef()
                        + ",\"moderator\":" + updatedUser.isModerator() + "}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));

        // Retrieve the updated user from the database
        User updatedUserFromDb = userRepo.findByUid(existingUser.getUid());

        // Verify the user has been updated with the new values
        Assertions.assertThat(updatedUserFromDb.getName()).isEqualTo(updatedUser.getName());
        Assertions.assertThat(updatedUserFromDb.getEmail()).isEqualTo(updatedUser.getEmail());
        Assertions.assertThat(updatedUserFromDb.isChef()).isEqualTo(updatedUser.isChef());
        Assertions.assertThat(updatedUserFromDb.isModerator()).isEqualTo(updatedUser.isModerator());
    }

    @Test
    public void testUpdateUserPasswordWithCorrectPassword() throws Exception {
        // Create a user to update password
        String oldPassword = "oldpassword";
        User user = new User("testuser", "pswdTest@example.com", passwordEncoder.encode(oldPassword), false, false);
        userRepo.save(user);
        User existingUser = userRepo.findByEmail("pswdTest@example.com");

        // Create the password update object with old and new passwords
        String newPassword = "newpassword";
        Password passwordUpdate = new Password(oldPassword, newPassword);

        // Perform the PUT request
        mockMvc.perform(MockMvcRequestBuilders.put("/users/update/password/{uid}", existingUser.getUid())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"oldPassword\":\"" + passwordUpdate.getOldPassword() + "\",\"newPassword\":\""
                        + passwordUpdate.getNewPassword() + "\"}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));

        // Retrieve the updated user from the database
        User updatedUserFromDb = userRepo.findByUid(existingUser.getUid());

        // Verify the user password has been updated
        boolean passwordMatches = passwordEncoder.matches(passwordUpdate.getNewPassword(),
                updatedUserFromDb.getPassword());
        Assertions.assertThat(passwordMatches).isTrue();

        // delete the created user
        userRepo.deleteById(existingUser.getUid());
    }

    @Test
    public void testUpdateUserPasswordWithIncorrectPassword() throws Exception {
        // Create a user to update password
        String oldPassword = "oldpassword";
        User user = new User("testuser", "pswdTest2@example.com", passwordEncoder.encode(oldPassword), false, false);
        userRepo.save(user);
        User existingUser = userRepo.findByEmail("pswdTest2@example.com");

        // Create the password update object with incorrect old password
        String incorrectOldPassword = "incorrectpassword";
        String newPassword = "newpassword";
        Password passwordUpdate = new Password(incorrectOldPassword, newPassword);

        // Perform the PUT request
        mockMvc.perform(MockMvcRequestBuilders.put("/users/update/password/{uid}", existingUser.getUid())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"oldPassword\":\"" + passwordUpdate.getOldPassword() + "\",\"newPassword\":\""
                        + passwordUpdate.getNewPassword() + "\"}"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.content().string("false"));

        // Retrieve the user from the database to verify the password remains unchanged
        User userFromDb = userRepo.findByUid(existingUser.getUid());

        // Verify the user password has not been updated
        boolean passwordMatches = passwordEncoder.matches(oldPassword, userFromDb.getPassword());
        Assertions.assertThat(passwordMatches).isTrue();

        // delete the created user
        userRepo.deleteById(existingUser.getUid());
    }
}