package com.backend.backend;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;

import com.backend.backend.models.Recipe;
import com.backend.backend.models.RecipeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "file:${user.dir}/.env")
public class RecipeControllerTest {
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private RecipeRepository recipeRepository;
    private Recipe testRecipe = new Recipe(
        123,
        "deletusTitle",
        2,
        0,
        Arrays.asList("Ingredient 1", "Ingredient 2", "Ingredient 3"),
        Arrays.asList("Step 1", "Step 2", "Step 3"),
        Arrays.asList("Tag 1", "Tag 2", "Tag 3")
    );
    @Test
    public void testGetAllRecipes() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/recipes/view"))
            .andExpect(MockMvcResultMatchers.status().isOk()) // isOk = 200
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));

        System.out.println("Passed test for /users/view");
    }
    @Test
    public void testGetOneRecipe() throws Exception {

        int testRecipeRid = recipeRepository.findByTitle("Fake Cake").getRid();
        mockMvc.perform(MockMvcRequestBuilders.get("/recipes/view/{rid}", testRecipeRid))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$[title]").value("Fake Cake"));

        System.out.println("Passed test for /recipes/view/{rid}");
    }
    @Test
    @Order(1)
    public void testCreateRecipe() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/recipes/create")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"authorId\":\"" + testRecipe.getAuthorId()
                    + "\",\"title\":\"" + testRecipe.getTitle()
                    + "\",\"recipeDifficulty\":" + testRecipe.getRecipeDifficulty()
                    + ",\"favourite\":" + testRecipe.getFavourites()
                    + ",\"ingredients\":" + objectMapper.writeValueAsString(testRecipe.getIngredients())
                    + ",\"instructions\":" + objectMapper.writeValueAsString(testRecipe.getInstructions())
                    + ",\"tags\":" + objectMapper.writeValueAsString(testRecipe.getTags())
                    + "}"))
            .andExpect(MockMvcResultMatchers.status().isCreated());
    }
    @Test
    @Order(2)
    public void testDeleteRecipe() throws Exception {

        int testRecipeRid = recipeRepository.findByTitle("deletusTitle").getRid();
        mockMvc.perform(MockMvcRequestBuilders.delete("/recipes/delete/{rid}", testRecipeRid))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));

        // Verify the user has been deleted
        boolean userExists = recipeRepository.existsById(testRecipe.getRid());
        Assertions.assertThat(userExists).isFalse();

        System.out.println("Passed test for /recipes/delete/{rid}");
    }
}
