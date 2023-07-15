package com.backend.backend;

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
import java.util.List;

import com.backend.backend.models.Recipe;
import com.backend.backend.models.RecipeRepository;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "file:${user.dir}/.env")
public class RecipeControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private RecipeRepository recipeRepository;
    private Recipe testRecipe = new Recipe(
        123,
        "Recipe Title",
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
    // @Test
    // public void testCreateRecipe() throws Exception {
    //     mockMvc.perform(MockMvcRequestBuilders.get("/recipes/v"))
    //         .andExpect(MockMvcResultMatchers.status().isOk()) // isOk = 200
    //         .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));

    //     System.out.println("Passed test for /users/view");
    // }
}
