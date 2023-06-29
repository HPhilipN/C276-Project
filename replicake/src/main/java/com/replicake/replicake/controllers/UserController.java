package com.replicake.replicake.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.replicake.replicake.models.User;
import com.replicake.replicake.models.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

/**
 * @ResponseBody indicates that the returned object should be serialized
 *               directly to the HTTP response body.
 *               The list of students will be converted to a JSON array.
 */
@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepo;

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

    @GetMapping("/login")
    @ResponseBody
    public boolean getUserLogin(@RequestBody User loginUser, HttpServletResponse response) {
        System.out.println("User logging in");
        try {
            String loginEmail = loginUser.getEmail();
            String loginPassword = loginUser.getPassword();

            User user = userRepo.findByEmail(loginEmail);
            if(user.getPassword().equals(loginPassword)){
                System.out.println("Successfully logged in " + loginEmail);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            System.out.println("Invalid Request Body");
            response.setStatus(404); // 404 = not found
            return false;
        }
    }

    @PostMapping("/signup")
    public boolean addUserSignup(@RequestBody User newUser, HttpServletResponse response) {
        System.out.println("Adding new User");
        try {
            String newEmail = newUser.getEmail();
            // if user with this email already exists
            if(userRepo.existsByEmail(newEmail)){
                System.out.println("User with this email exists");
                return false;
            }
                
            String newName = newUser.getName();
            newName = newName.toLowerCase(); // lowercase the entire name
            newName = newName.substring(0, 1).toUpperCase() + newName.substring(1); // Capitalize first letter of name
            String newPassword = newUser.getPassword();
            boolean basicRole = newUser.isBasic();
            boolean chefRole = newUser.isChef();
            boolean modRole = newUser.isModerator();

            // add new student to student table in DB
            User newUserCreated = new User(newName, newEmail, newPassword, basicRole, chefRole, modRole);
            userRepo.save(newUserCreated);

            response.setStatus(201); // 201 = created new object
            return true; 
        } catch (Exception e) {
            System.out.println("Invalid input or access failed");
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
            user.setPassword(updatedUser.getPassword());
            user.setBasic(updatedUser.isBasic());
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