package com.backend.backend.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.models.Password;
import com.backend.backend.models.User;
import com.backend.backend.models.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

/**
 * @ResponseBody indicates that the returned object should be serialized
 *               directly to the HTTP response body.
 *               The list of students will be converted to a JSON array.
 */
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/view")
    @ResponseBody
    public List<User> getAllUsers(HttpServletResponse response) {
        System.out.println("Getting all Users");
        try {
            // get all users from database
            List<User> userList = userRepo.findAll();
            return userList;
        } catch (Exception e) {
            System.out.println("Nothing found");
            response.setStatus(404); // 404 = not found
            return Collections.emptyList();
        }
    }

    @PostMapping("/login")
    @ResponseBody
    public User getUserLogin(@RequestBody User loginUser, HttpServletResponse response) {
        System.out.println("User logging in");
        try {
            String loginEmail = loginUser.getEmail();
            String loginPassword = loginUser.getPassword();

            // get & compare passwords
            User user = userRepo.findByEmail(loginEmail);
            String storedPassword = user.getPassword();
            boolean passwordMatches = passwordEncoder.matches(loginPassword, storedPassword);
            if (passwordMatches) {
                System.out.println("Successfully logged in " + loginEmail);
                return user;
            } else {
                return null;
            }
        } catch (Exception e) {
            System.out.println("Invalid Request Body");
            response.setStatus(404); // 404 = not found
            return null;
        }
    }

    @PostMapping("/signup")
    public boolean addUserSignup(@RequestBody User newUser, HttpServletResponse response) {
        System.out.println("Adding new User");
        try {
            String newEmail = newUser.getEmail();
            // if user with this email already exists
            if (userRepo.existsByEmail(newEmail)) {
                System.out.println("User with this email exists");
                return false;
            }

            String newPassword = newUser.getPassword();
            // hash & secure password before storage
            String hashedPassword = passwordEncoder.encode(newPassword);

            String newName = newUser.getName();
            newName = newName.toLowerCase(); // lowercase the entire name
            newName = newName.substring(0, 1).toUpperCase() + newName.substring(1); // Capitalize first letter of name

            boolean chefRole = newUser.isChef();
            System.out.println("Chef role is " + chefRole);
            boolean modRole = newUser.isModerator();
            System.out.println("Mod role is " + modRole);

            // add new student to student table in DB
            User newUserCreated = new User(newName, newEmail, hashedPassword, chefRole, modRole);
            userRepo.save(newUserCreated);

            response.setStatus(201); // 201 = created new object
            return true;
        } catch (Exception e) {
            System.out.println("Invalid data or Access denied");
            response.setStatus(401); // 401 = Unauthorized
            return false;
        }
    }

    @PutMapping("/update/{uid}")
    public boolean updateUser(@PathVariable String uid, @RequestBody User updatedUser,
            HttpServletResponse response) {
        System.out.println("Updating user: " + uid);
        int userId = Integer.parseInt(uid);
        try {
            User user = userRepo.findByUid(userId);
            // Update the fields of the existing student with the new values
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setChef(updatedUser.isChef());
            user.setModerator(updatedUser.isModerator());
            // add new student to student table in DB
            userRepo.save(user);

            response.setStatus(200);
            return true;
        } catch (Exception e) {
            System.out.println("Invalid uid");
            response.setStatus(400); // 400 = Bad request
            return false;
        }
    }

    @PutMapping("/update/password/{uid}")
    public boolean updateUserPassword(@PathVariable String uid, @RequestBody Password updateUserPassword,
            HttpServletResponse response) {
        System.out.println("Updating user: " + uid);
        int userId = Integer.parseInt(uid);
        try {
            User user = userRepo.findByUid(userId);
            String storedPassword = user.getPassword();
            String oldPassword = updateUserPassword.getOldPassword();
            String newPassword = updateUserPassword.getNewPassword();
            String hashedPassword = passwordEncoder.encode(newPassword);

            boolean passwordMatches = passwordEncoder.matches(oldPassword, storedPassword);
            if (passwordMatches) {
                System.out.println("Correct Password");
                user.setPassword(hashedPassword);

                // add new student to student table in DB
                userRepo.save(user);
                response.setStatus(200);

                return true;
            } else {
                System.out.println("Invalid Password");
                response.setStatus(400); // 400 = Bad request
                return false;
            }
        } catch (Exception e) {
            System.out.println("Invalid uid");
            response.setStatus(400); // 400 = Bad request
            return false;
        }
    }

    @DeleteMapping("/delete/{uid}")
    public boolean deleteIndividualUser(@PathVariable String uid, HttpServletResponse response) {
        System.out.println("Deleting User");
        try {
            int userId = Integer.parseInt(uid);
            userRepo.deleteById(userId);
            response.setStatus(200); // 200 = OK
            return true;
        } catch (Exception e) {
            System.out.println("Invalid uid, cannot delete");
            response.setStatus(400); // 400 = Bad request
            return false;
        }
    }
}