package com.backend.backend.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.models.Recipe;
import com.backend.backend.models.RecipeRepository;

import jakarta.servlet.http.HttpServletResponse;

// 
@RestController
@RequestMapping("/recipes")
public class RecipeController {
    @Autowired
    private RecipeRepository recipeRepository;

    // create user to db
    @PostMapping("/create")
    @ResponseBody
    public boolean createRecipe(@RequestBody Recipe newRecipe, HttpServletResponse response) {
        System.out.println("Creating new recipe");
        try {
            int authorId = newRecipe.getAuthorId();
            String title = newRecipe.getTitle();
            int recipeDifficulty = newRecipe.getRecipeDifficulty();
            int favourites = newRecipe.getFavourites();
            List<String> ingredients = newRecipe.getIngredients();
            List<String> instructions = newRecipe.getInstructions();
            List<String> tags = newRecipe.getTags();

            // Save into DB
            Recipe newRecipeCreated = new Recipe(authorId, title, favourites, recipeDifficulty, ingredients,
                    instructions, tags);
            recipeRepository.save(newRecipeCreated);

            response.setStatus(201);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(401);
            return false;
        }
    }

    // get delete user from db
    @DeleteMapping("/delete/{uid}")
    public boolean deleteIndividualUser(@PathVariable String uid, HttpServletResponse response) {
        System.out.println("Deleting Recipe");
        try {
            int recipeId = Integer.parseInt(uid);
            recipeRepository.deleteById(recipeId);
            response.setStatus(200); // 200 = OK
            return true;
        } catch (Exception e) {
            System.out.println("Invalid uid, cannot delete");
            response.setStatus(400); // 400 = Bad request
            return false;
        }
    }

    // get all users from db
    @GetMapping("/view")
    @ResponseBody
    public List<Recipe> getAllRecipes(HttpServletResponse response) {
        System.out.println("Getting all Recipies");
        try {
            // get all users from database
            List<Recipe> recipeList = recipeRepository.findAll();
            return recipeList;
        } catch (Exception e) {
            System.out.println("Nothing found");
            response.setStatus(404); // 404 = not found
            return Collections.emptyList();
        }
    }

    // get user from db
    @GetMapping("/view/{uid}")
    public Recipe getRecipeByUid(@PathVariable String uid, HttpServletResponse response) {
        System.out.println("Getting recipe" + uid);
        try {
            int recipeId = Integer.parseInt(uid);
            Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
            if (recipeOptional.isPresent()) {
                return recipeOptional.get();
            } else {
                response.setStatus(404); // 404 = not found
                System.out.println("Recipe not found");
                return null;
            }
        } catch (Exception e) {
            System.out.println("Nothing found");
            response.setStatus(404); // 404 = not found
            return new Recipe();
        }
    }
}
