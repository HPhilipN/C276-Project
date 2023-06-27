package com.replicake.replicake.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.replicake.replicake.models.User;
import com.replicake.replicake.models.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

/**
 * @ResponseBody indicates that the returned object should be serialized
 *               directly to the HTTP response body.
 *               The list of students will be converted to a JSON array.
 * @mod mappings indicate mappings that only moderators utilize
 * @user mappings indicate mappings that user & moderators can utilize
 */
@Controller
public class UserController {
    @Autowired
    private UserRepository userRepo;

    @GetMapping("/mod/view/users")
    @ResponseBody
    public List<User> getAllUsers(Model model, HttpServletResponse response) {
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

    @GetMapping("/mod/view/{uid}")
    @ResponseBody
    public User getIndividualUser(@PathVariable String uid, Model model, HttpServletResponse response) {
        System.out.println("Getting User with id: " + uid);
        int userId = Integer.parseInt(uid);
        try {
            User user = userRepo.findByUid(userId);
            return user;
        } catch (Exception e) {
            System.out.println("Invalid uid");
            response.setStatus(404); // 404 = not found
            return null;
        }
    }

    @PostMapping("/user/add/user")
    public void addIndividualUser(@RequestBody User newUser, HttpServletResponse response) {
        System.out.println("Adding new User");
        try {
            String newName = newUser.getName();
            newName = newName.substring(0, 1).toUpperCase() + newName.substring(1); // Capitalize first letter of name
            String newEmail = newUser.getEmail();
            String newPassword = newUser.getPassword();
            boolean basicRole = newUser.isBasic();
            boolean chefRole = newUser.isChef();
            boolean modRole = newUser.isModerator();

            // add new student to student table in DB
            User newUserCreated = new User(newName, newEmail, newPassword, basicRole, chefRole, modRole);
            userRepo.save(newUserCreated);

            response.setStatus(201); // 201 = created new object
        } catch (Exception e) {
            System.out.println("Invalid input or access failed");
            response.setStatus(401); // 401 = Unauthorized
        }
    }

    // this function is for user self-updating info
    @PutMapping("/user/update/{uid}")
    public void updateUserSelf(@PathVariable String uid, @RequestBody User updatedUser,
            HttpServletResponse response) {
        System.out.println("User: " + uid + " self-updating");
        int userId = Integer.parseInt(uid);
        try {
            User user = userRepo.findByUid(userId);
            // Update the fields of the existing student with the new values
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            // add new student to student table in DB
            userRepo.save(user);

            response.setStatus(200);
        } catch (Exception e) {
            System.out.println("Invalid uid");
            response.setStatus(400); // 400 = Bad request
        }
    }

    // this function allows for user moderator updating
    @PutMapping("/mod/update/{uid}")
    public void updateUserMod(@PathVariable String uid, @RequestBody User updatedUser,
            HttpServletResponse response) {
        System.out.println("Moderator updating user: " + uid);
        int userId = Integer.parseInt(uid);
        try {
            User user = userRepo.findByUid(userId);
            // Update the fields of the existing student with the new values
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setBasic(updatedUser.isBasic());
            user.setChef(updatedUser.isChef());
            user.setModerator(updatedUser.isModerator());
            // add new student to student table in DB
            userRepo.save(user);

            response.setStatus(200);
        } catch (Exception e) {
            System.out.println("Invalid uid");
            response.setStatus(400); // 400 = Bad request
        }
    }

    @DeleteMapping("/mod/delete/{uid}")
    public void deleteIndividualUser(@PathVariable String uid, HttpServletResponse response) {
        System.out.println("Deleting User");
        try {
            int userId = Integer.parseInt(uid);
            userRepo.deleteById(userId);
            response.setStatus(200); // 200 = OK
        } catch (Exception e) {
            System.out.println("Invalid uid, cannot delete");
            response.setStatus(400); // 400 = Bad request
        }
    }
}